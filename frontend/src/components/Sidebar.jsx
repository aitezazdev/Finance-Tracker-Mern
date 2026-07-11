import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../store/Slices/authSlice";
import { toast } from "react-toastify";

const navItems = [
  { name: "Dashboard", icon: FaHome, path: "/dashboard" },
  { name: "Add Transaction", icon: FaPlusCircle, path: "#", isModal: true },
  { name: "Transactions", icon: BiTransferAlt, path: "/transactions" },
  { name: "Analytics", icon: FaChartPie, path: "/analytics" },
];

const Sidebar = ({ setShowModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/login");
  };
  return (
    <aside className="hidden md:flex w-64 min-h-screen fixed left-0 top-0 bg-white border-r border-zinc-200 flex-col z-10">
      <div className="px-6 py-6 border-b border-zinc-200">
        <h1 className="text-xl font-black text-zinc-900 tracking-tight">Expensely</h1>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1.5">
          {navItems.map(({ name, icon: Icon, path, isModal }) => (
            <li key={name}>
              <NavLink
                to={path}
                onClick={(e) => {
                  if (isModal) {
                    e.preventDefault();
                    setShowModal(true);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all cursor-pointer text-sm font-semibold ${
                    isActive && !isModal
                      ? "bg-emerald-50/70 text-emerald-600"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  }`
                }>
                <Icon className="text-base" />
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-6 border-t border-zinc-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-rose-600 cursor-pointer bg-rose-50 hover:bg-rose-100 rounded-xl text-sm font-semibold transition-all border border-zinc-200">
          <FaSignOutAlt className="text-sm" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
