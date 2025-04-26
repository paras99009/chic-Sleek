import{ useState } from "react";
import { useUserContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { signOutAccount } from "../lib/appwrite/api";
import { Menu, X } from "lucide-react";

const Navbar= () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = user.email === "test1@gmail.com"

  const handleLogOut = async () => {
    const isSuccess = await signOutAccount();
    if (isSuccess) {
      navigate(0);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-light custom-navbar shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        {/* Website Name */}
        <Link className="navbar-brand fw-bold fs-2" to="#">
          Chic & Sleek
        </Link>

        {/* Toggle Button for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          {isMenuOpen ? <X /> : <Menu className="navbar-toggler-icon" />}
        </button>

        {/* Collapsible Menu */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarContent"
        >
          {/* Center Nav Links */}
          <div className="d-lg-flex justify-content-center flex-grow-1">
            <ul className="navbar-nav fs-5 gap-4">
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-hover"
                  to="/explore"
                  onClick={closeMenu}
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-hover"
                  to="/ai-chat/skin-test"
                  onClick={closeMenu}
                >
                  Skin Test
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-hover"
                  to="/nearby"
                  onClick={closeMenu}
                >
                  Nearby Dermatologist
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-hover"
                  to="/about"
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Profile */}
          <div className="d-flex align-items-center gap-2">
            {user && (
              <div className="dropdown d-flex align-items-center">
                <button
                  className="btn dropdown-toggle d-flex align-items-center p-0 border-0 bg-transparent"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user.imageUrl}
                    className="rounded-circle"
                    height={40}
                    width={40}
                    alt="Profile"
                  />
                  <p className="fs-5 fw-italic mb-0 ms-2">@{user.name}</p>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                 {isAdmin && <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/admin"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                  </li>}
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/saved"
                      onClick={closeMenu}
                    >
                      saved
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleLogOut();
                        closeMenu();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
