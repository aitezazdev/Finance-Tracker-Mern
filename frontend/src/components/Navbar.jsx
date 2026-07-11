import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/Slices/authSlice";
import { userInfo } from "../api/userInfoApi";

const Navbar = ({ setShowModal }) => {
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
      <nav className="flex fixed top-0 z-40 w-full items-center justify-between px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 text-zinc-900 shadow-xs">
        <NavLink
          to="/"
          className="text-xl font-black tracking-tight flex items-center space-x-2 text-zinc-950">
          <span>Finance Tracker</span>
        </NavLink>

        <ul className="hidden md:flex items-center space-x-2 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-50/50 text-emerald-600 border border-zinc-200 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`
              }>
              Home
            </NavLink>
          </li>
          <li>
            {user ? (
              <span className="flex items-center space-x-3">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-emerald-50/50 text-emerald-600 border border-zinc-200 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                    }`
                  }>
                  Dashboard
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white font-extrabold text-xs hover:opacity-90 transition-all border border-zinc-200 shadow-xs ${
                      isActive ? "ring-2 ring-emerald-500/35" : ""
                    }`
                  }>
                  {getTrimmedName()}
                </NavLink>
              </span>
            ) : (
              <NavLink
                to="/login"
                className="bg-zinc-950 hover:bg-zinc-900 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs border border-zinc-900/50 cursor-pointer">
                Login
              </NavLink>
            )}
          </li>
        </ul>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-zinc-700 hover:bg-zinc-100 rounded-xl transition cursor-pointer"
          aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        className={`fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-2xl border-l border-zinc-250 transform transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-4">
            <span className="text-lg font-black text-zinc-950">Menu</span>
            <button
              onClick={toggleMenu}
              className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-50 transition cursor-pointer"
              aria-label="Close menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              <div className="mb-6 p-4 bg-zinc-50 border border-zinc-200/60 rounded-2xl">
                <span className="text-zinc-400 text-xs font-semibold block mb-1">Logged in as</span>
                <span className="text-zinc-900 font-extrabold text-base">
                  {user.name}
                </span>
              </div>

              <ul className="space-y-1.5 mb-auto">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-50/70 text-emerald-600"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 rounded-xl text-sm font-semibold transition-all text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer"
                  >
                    + Add Transaction
                  </button>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-50/70 text-emerald-600"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-50/70 text-emerald-600"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}>
                    Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-50/70 text-emerald-600"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}>
                    Analytics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-50/70 text-emerald-600"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </NavLink>
                </li>
              </ul>

              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-rose-50 text-rose-600 border border-zinc-200 hover:bg-rose-100 py-3 rounded-xl transition-all shadow-xs text-sm font-bold cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <div className="mt-auto mb-6 w-full">
              <NavLink
                to="/login"
                className="block w-full text-center bg-zinc-950 hover:bg-zinc-900 py-3 rounded-xl transition-all shadow-xs text-white text-sm font-bold cursor-pointer"
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
