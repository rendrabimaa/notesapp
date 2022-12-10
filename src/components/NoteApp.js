import React from "react";
import LandingPage from "../pages/LandingPage";
import About from "../pages/About";
import LoginPage from "../pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import { getUserLogged, putAccessToken } from "../utils/api";
import NotesPage from "../pages/NotesPage";
import AddNotePage from "../pages/AddNotePage";

function NoteApp() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

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
    <Routes>
      <Route path="/*" element={<NotesPage user={authedUser} setUser={setAuthedUser} />} />
      <Route path="/notes/add" element={<AddNotePage user={authedUser} setUser={setAuthedUser} />} />
    </Routes>
  );
}

export default NoteApp;
