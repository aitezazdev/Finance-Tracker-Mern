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
    <div className="max-w-lg mx-auto mt-24 p-8 bg-white rounded-3xl shadow-xl border border-gray-200 space-y-8">
      <div className="flex items-center space-x-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg">
          {getInitials(userData.name)}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none mb-2 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={`w-full px-4 py-2 rounded-xl border ${
                  error.toLowerCase().includes("email")
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 outline-none transition`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && error.toLowerCase().includes("email") && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-900">
                {userData.name}
              </h2>
              <p className="text-gray-500">{userData.email}</p>
            </>
          )}
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      <div>
        <p className="text-sm text-gray-400">
          Joined on{" "}
          <span className="text-gray-600 font-medium">
            {new Date(userData.createdAt).toLocaleDateString("en-GB")}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 px-5 py-3 cursor-pointer bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow">
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setName(userData.name);
                setEmail(userData.email);
                setError("");
              }}
              className="flex-1 px-5 py-3 cursor-pointer bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition shadow">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 px-5 py-3 cursor-pointer bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow">
              Edit Profile
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 px-5 py-3 cursor-pointer bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow">
              Delete Account
            </button>
          </>
        )}
      </div>

      {deleteError && (
        <p className="text-sm text-red-500 text-center">{deleteError}</p>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full space-y-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600">
              Deleting your account is permanent. This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white">
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
