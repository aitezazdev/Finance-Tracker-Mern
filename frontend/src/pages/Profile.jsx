import React, { useEffect, useState } from "react";
import {
  userInfo,
  updateUserInfo,
  deleteUserAccount,
} from "../api/userInfoApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/Slices/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserInfo = async () => {
    try {
      const response = await userInfo();
      const data = response.data;
      setUserData(data);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSave = async () => {
    try {
      setError("");
      const response = await updateUserInfo({ name, email });
      toast.success("Profile updated");
      setUserData(response.data);
      setIsEditing(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };

  const confirmDelete = async () => {
    try {
      setDeleteError("");
      await deleteUserAccount();
      toast.success("Account deleted");
      dispatch(logout());
      setShowDeleteConfirm(false);
      navigate("/register");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete account.";
      setDeleteError(msg);
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-28 p-8 sm:p-10 bg-white rounded-3xl shadow-sm border border-zinc-200 space-y-8">
      <div className="flex items-center space-x-6">
        <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-black shadow-xs select-none">
          {getInitials(userData.name)}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold text-zinc-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={`w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border ${
                  error.toLowerCase().includes("email")
                    ? "border-rose-500"
                    : "border-zinc-300"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold text-zinc-800`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && error.toLowerCase().includes("email") && (
                <p className="text-xs font-semibold text-rose-600 mt-1">{error}</p>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight">
                {userData.name}
              </h2>
              <p className="text-zinc-500 font-semibold text-sm">{userData.email}</p>
            </>
          )}
        </div>
      </div>

      <hr className="border-t border-zinc-100" />

      <div>
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Account Created
        </p>
        <p className="text-sm font-bold text-zinc-800 mt-1.5">
          {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          }) : "—"}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 px-5 py-3 cursor-pointer bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-xs text-sm">
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setName(userData.name);
                setEmail(userData.email);
                setError("");
              }}
              className="flex-1 px-5 py-3 cursor-pointer bg-white text-zinc-700 border border-zinc-300 font-bold rounded-xl hover:bg-zinc-50 transition shadow-xs text-sm">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 px-5 py-3 cursor-pointer bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-xs text-sm">
              Edit Profile
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 px-5 py-3 cursor-pointer bg-rose-50 text-rose-600 border border-rose-100 font-bold rounded-xl hover:bg-rose-100 transition shadow-xs text-sm">
              Delete Account
            </button>
          </>
        )}
      </div>

      {deleteError && (
        <p className="text-xs font-bold text-rose-600 text-center">{deleteError}</p>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 sm:p-8 max-w-sm w-full space-y-4 text-center">
            <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">
              Are you sure?
            </h2>
            <p className="text-sm font-medium text-zinc-500 leading-relaxed">
              Deleting your account is permanent and cannot be undone. All your financial logs will be wiped out.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 font-bold text-sm cursor-pointer shadow-xs">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm cursor-pointer shadow-xs">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
