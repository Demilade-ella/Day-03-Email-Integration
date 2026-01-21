import React, { useState } from "react";
import DiamondIcon from "@mui/icons-material/Diamond";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <DiamondIcon className="logo-icon" />
        <h2> Diamond </h2>
      </div>

      <div className={isOpen ? "navbar-links open" : "navbar-links"}>
        <a href="#home"> Home </a>
        <a href="#plans"> Plans </a>
        <a href="#products"> Products </a>
        <a href="#contact" className="active">
          Contacts
        </a>
        <a href="#about"> About us </a>
      </div>

      <div className="navbar-logins">
        <button className="btn login-btn"> Login </button>
        <button className="btn get-btn"> Get started </button>
      </div>

      <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <CloseIcon className="icon" />
        ) : (
          <MenuIcon className="icon" />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
