import React from 'react';
import { Link } from 'react-router-dom'; // ✅ IMPORT THIS
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link> {/* ✅ Use capital L */}
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link> {/* ✅ Check route spelling */}
      </div>
    </nav>
  );
}

export default Navbar;
