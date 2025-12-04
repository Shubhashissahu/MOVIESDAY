import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Heart, Search, Menu, X, Sun, Moon } from "lucide-react";
import "../css/Navbar.css";

function Navbar({ favoritesCount = 0, onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optional: apply theme class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      console.log("Searching for:", searchQuery);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar ${
        isScrolled ? "scrolled" : ""
      } ${isDarkMode ? "dark" : "light"}`}
    >
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <Film className="brand-icon" size={28} />
          <div>
            <span className="brand-text">MOVIESDAY</span>
            <span className="brand-subtitle">Discover &amp; Save</span>
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="navbar-center">
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            <span>Home</span>
            <div className="nav-indicator"></div>
          </Link>

          <Link
            to="/favorites"
            className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
          >
            <Heart size={18} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="badge">{favoritesCount}</span>
            )}
            <div className="nav-indicator"></div>
          </Link>

          <Link
            to="/trending"
            className={`nav-link ${isActive("/trending") ? "active" : ""}`}
          >
            <span>Trending</span>
            <div className="nav-indicator"></div>
          </Link>

          <Link
            to="/genres"
            className={`nav-link ${isActive("/genres") ? "active" : ""}`}
          >
            <span>Genres</span>
            <div className="nav-indicator"></div>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="navbar-actions">
          {/* Search */}
          <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
            <form onSubmit={handleSearch}>
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                className="search-input"
              />
            </form>
          </div>

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className="mobile-nav-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/favorites"
          className="mobile-nav-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Heart size={18} />
          Favorites
          {favoritesCount > 0 && (
            <span className="badge">{favoritesCount}</span>
          )}
        </Link>

        <Link
          to="/trending"
          className="mobile-nav-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Trending
        </Link>

        <Link
          to="/genres"
          className="mobile-nav-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Genres
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
