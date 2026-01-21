import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import Title from "./components/Title.js";
import ContactForm from "./components/ContactForm.js";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import "./styles.css";
import "./styles/ContactForm.css";
import "./styles/Navbar.css";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "app dark-theme" : "app light-theme"}>
      <div className="blob-container">
        <div className="blob pink"></div>
        <div className="blob purple"></div>
      </div>

      <button onClick={toggleTheme} className="theme-toggle-btn">
        {isDarkMode ? (
          <ToggleOnIcon className="toggle" />
        ) : (
          <ToggleOffIcon className="toggle" />
        )}
      </button>
      <Navbar />
      <Title />
      <ContactForm />
    </div>
  );
}
