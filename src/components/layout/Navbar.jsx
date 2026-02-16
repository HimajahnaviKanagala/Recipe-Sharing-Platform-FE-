import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `transition-colors font-medium ${
      isActive(path) ? "text-red-600" : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">
              🍳
            </span>
            <span className="text-2xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              RecipeShare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>

            {user && (
              <>
                <Link to="/my-recipes" className={navLinkClass("/my-recipes")}>
                  My Recipes
                </Link>
                <Link
                  to="/create-recipe"
                  className={navLinkClass("/create-recipe")}
                >
                  Create Recipe
                </Link>
              </>
            )}

            {isAdmin() && (
              <Link to="/admin" className={navLinkClass("/admin")}>
                <span className="flex items-center space-x-1">
                  <span>Admin Panel</span>
                  <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full font-semibold">
                    ⚡
                  </span>
                </span>
              </Link>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
                  <div className="w-9 h-9 bg-linear-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                      {user.username}
                    </span>
                    {user.role !== "USER" && (
                      <span className="text-xs text-red-600 font-semibold">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`${navLinkClass("/")} px-4 py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/my-recipes"
                    className={`${navLinkClass("/my-recipes")} px-4 py-2`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Recipes
                  </Link>
                  <Link
                    to="/create-recipe"
                    className={`${navLinkClass("/create-recipe")} px-4 py-2`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Recipe
                  </Link>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className={`${navLinkClass("/admin")} px-4 py-2`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel ⚡
                    </Link>
                  )}

                  {/* User Info - Mobile */}
                  <div className="px-4 py-2 border-t border-gray-200 mt-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-linear-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.username}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {user.role !== "USER" && (
                          <p className="text-xs text-red-600 font-semibold">
                            {user.role}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full btn-secondary"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <div className="px-4">
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="btn-primary w-full">Sign Up</button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
