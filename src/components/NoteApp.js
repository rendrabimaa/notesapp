import React, { useState, useEffect, useMemo } from "react";
import LandingPage from "../pages/LandingPage";
import About from "../pages/About";
import LoginPage from "../pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import ThemeContext from '../context/ThemeContext';
import { getUserLogged, putAccessToken } from "../utils/api";
import NotesPage from "../pages/NotesPage";
import AddNotePage from "../pages/AddNotePage";
import DetailNotePage from "../pages/DetailNotePage";
import CategoriesPage from "../pages/CategoriesPage";

function NoteApp() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  const [categoryActive, setCategoryActive] = React.useState("all");
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const changeTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', changeTheme);
      return changeTheme;
    });
  };

  const themeContextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    async function fetchAuthedUserData() {
      const { data } = await getUserLogged();

      setAuthedUser(data);
      setInitializing(false);
    }
    fetchAuthedUserData();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthedUser(data);
  }

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
      </Routes>
    );
  }
  
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="app" data-theme={theme}>
        <Routes>
          <Route path="/*" element={<NotesPage user={authedUser} setUser={setAuthedUser} />} />
          <Route path="/notes/add" element={<AddNotePage user={authedUser} setUser={setAuthedUser} />} />
          <Route path="/note/:id" element={<DetailNotePage user={authedUser} setUser={setAuthedUser} />} />
          <Route path="/categories" element={<CategoriesPage user={authedUser} setUser={setAuthedUser} />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default NoteApp;
