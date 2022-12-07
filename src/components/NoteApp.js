import React from "react";
import LandingPage from "../pages/LandingPage";
import About from "../pages/About";
import LoginPage from "../pages/LoginPage";
import { Route, Routes } from "react-router-dom";

class NoteApp extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
}

export default NoteApp;
