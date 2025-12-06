import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-logo">MOVIESDAY</h3>
        
        <p className="footer-text">
          Discover movies, explore genres, and save your favorites.
        </p>

        <p className="footer-credit">
          © {new Date().getFullYear()} MOVIESDAY • Built with  using React
        </p>
      </div>
    </footer>
  );
}

export default Footer;
