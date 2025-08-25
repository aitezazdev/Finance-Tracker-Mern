import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/Slices/authSlice";
import { userInfo } from "../api/userInfoApi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getTrimmedName = () => {
    if (!userData?.name) return "";
    return userData.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const getUserProfile = async () => {
    try {
      const response = await userInfo();
      setUserData(response.data);
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    user && getUserProfile();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="flex fixed top-0 z-40 w-full items-center justify-between px-4 md:px-12 py-4 bg-gray-900 shadow-md text-white">
        <NavLink
          to="/"
          className="text-xl md:text-3xl font-extrabold tracking-wide flex items-center space-x-2">
          <span>Finance Tracker</span>
        </NavLink>

        <ul className="hidden md:flex items-center space-x-6 text-lg font-medium">
          <>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition duration-200 ${
                    isActive && `border-b-2 border-b-cyan-600`
                  }`
                }>
                Home
              </NavLink>
            </li>
            <li>
              {user ? (
                <span className="flex items-center space-x-4">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `hover:text-gray-300 transition duration-200 ${
                        isActive && `border-b-2 border-b-cyan-600`
                      }`
                    }>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center justify-center w-10 h-10 rounded-full bg-cyan-600 text-white font-bold text-sm hover:opacity-90 transition duration-200 ${
                        isActive ? "ring-2 ring-cyan-300" : ""
                      }`
                    }>
                    {getTrimmedName()}
                  </NavLink>
                </span>
              ) : (
                <NavLink
                  to="/login"
                  className="bg-blue-500 px-5 py-2 rounded-full hover:bg-blue-600 transition duration-200 shadow-md">
                  Login
                </NavLink>
              )}
            </li>
          </>
        </ul>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-3/4 h-full bg-white z-50 shadow-xl transform transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-gray-800">Menu</span>
            <button
              onClick={toggleMenu}
              className="text-gray-600 p-2"
              aria-label="Close menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {user ? (
            <>
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <span className="text-gray-500 block mb-2">Logged in as</span>
                <span className="text-gray-800 font-medium text-lg">
                  👋 {user.name}
                </span>
              </div>

              <ul className="space-y-4 mb-auto">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => {
                      `block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200`;
                    }}
                    onClick={() => setIsMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/summary"
                    className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}>
                    Summary
                  </NavLink>
                </li>
              </ul>

              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md text-white font-medium">
                Logout
              </button>
            </>
          ) : (
            <div className="mt-auto mb-6 w-full">
              <NavLink
                to="/login"
                className="block w-full text-center bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md text-white font-medium"
                onClick={() => setIsMenuOpen(false)}>
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
