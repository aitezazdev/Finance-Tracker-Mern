import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/Slices/authSlice";
import { MdOutlineError, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success("Login successful");
      setData({
        email: "",
        password: "",
      });
      setErrors({});
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed");
      setErrors((prevErrors) => ({
        ...prevErrors,
        backend: error || "Login failed, please try again",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
      backend: "",
    }));
  };

  return (
    <div className="w-full flex items-center pt-10 mt-20 justify-center bg-gray-50">
      <div className="w-full max-w-md px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl px-8 pt-8 pb-10 border border-gray-200 transition-all">
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h3>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          {errors.backend && (
            <div
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
              role="alert">
              <div className="flex">
                <div className="py-1">
                  <MdOutlineError className="w-6 h-6 mr-4 text-red-500" />
                </div>
                <span>{errors.backend}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineEmail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  onChange={handleChange}
                  value={data.email}
                  className="w-full pl-10 py-3 px-4 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white border border-gray-300 transition-all"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="user@example.com"
                  autoComplete="off"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  onChange={handleChange}
                  value={data.password}
                  className="w-full pl-10 pr-10 py-3 px-4 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white border border-gray-300 transition-all"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                  tabIndex={-1}>
                  {showPassword ? (
                    <AiFillEyeInvisible className="w-6 h-6 text-gray-500" />
                  ) : (
                    <AiFillEye className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-all disabled:opacity-70">
              {loading ? (
                <span className="flex items-center">
                  <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold">
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
