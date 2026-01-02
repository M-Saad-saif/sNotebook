import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Navbar() {
  // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [isOpen, setIsOpen] = useState(false);// states for mobile
  const [showProfileModal, setShowProfileModal] = useState(false);
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
    setShowProfileModal(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Open profile modal
  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  // Close profile modal
  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  // for mobile
  const openProfileAndCloseMenu = () => {
    openProfileModal();
    closeMenu();
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/" onClick={closeMenu}>
            <i className="fa-solid fa-book-skull"></i> s.NoteBook
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-desktop-menu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

            <div className="navbar-actions">
              {!localStorage.getItem("token") ? (
                <>
                  <Link className="btn btn-primary mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-primary mx-1" to="/signup">
                    Signup
                  </Link>
                  <Link
                    className="btn btn-primary mx-1"
                    style={{ height: "50%", alignSelf: "end" }}
                    to="https://github.com/M-Saad-saif"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary mx-0 my-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                  <div className="profile-icon" onClick={openProfileModal}>
                    <i className="fa-solid fa-user"></i>
                  </div>
           
                </>
              )}
            </div>
          </div>
          {/* =========================================================================================================== */}
          {/* Mobile Hamburger Button */}
          <button
            className={`navbar-toggler ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Sliding Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Sliding Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <h3>
            <i className="fa-solid fa-book-skull"></i> s.NoteBook
          </h3>
          <button className="mobile-menu-close" onClick={closeMenu}>
            &times;
          </button>
        </div>

        <ul className="mobile-nav">
          <li className="mobile-nav-item">
            <Link
              className={`mobile-nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-home"></i> Home
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link
              className={`mobile-nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to="/about"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-info-circle"></i> About
            </Link>
          </li>
        </ul>

        <div className="mobile-menu-actions">
          {!localStorage.getItem("token") ? (
            <>
              <Link
                className="btn btn-primary btn-block"
                to="/login"
                onClick={closeMenu}
              >
                <i className="fa-solid fa-sign-in-alt"></i> Login
              </Link>
              <Link
                className="btn btn-primary btn-block"
                to="/signup"
                onClick={closeMenu}
              >
                <i className="fa-solid fa-user-plus"></i> Signup
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary btn-block"
                onClick={openProfileAndCloseMenu}
              >
                <i className="fa-solid fa-user"></i> Profile
              </button>
              <button
                className="btn btn-primary btn-block"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-sign-out-alt"></i> Logout
              </button>
            </>
          )}
          <Link
            className="btn btn-primary btn-block"
            to="https://github.com/M-Saad-saif"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <i className="fab fa-github"></i> GitHub
          </Link>
          <UserProfile
            showProfileModal={showProfileModal}
            closeProfileModal={closeProfileModal}
          />
        </div>
      </div>
    </>
  );
}
