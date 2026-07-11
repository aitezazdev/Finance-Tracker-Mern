import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/Slices/authSlice";
import { MdOutlineError, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await dispatch(registerUser(data)).unwrap();
      toast.success("Registration successful");

      setData({
        name: "",
        email: "",
        password: "",
      });
      setErrors({});
      navigate("/");

    } catch (err) {
      toast.error("Registration failed");

      setErrors((prevErrors) => ({
        ...prevErrors,
        backend: err || "Registration failed. Please try again.",
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
    <div className="w-full min-h-[85vh] flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-3xl p-8 sm:p-10 border border-zinc-200 transition-all"
        >
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-black text-zinc-950 tracking-tight">
              Create Account
            </h3>
            <p className="text-zinc-500 font-medium mt-1 text-sm">Sign up to get started</p>
          </div>

          {errors.backend && (
            <div
              className="bg-rose-50 border-l-4 border-rose-500 text-rose-800 p-4 rounded-xl mb-6 text-sm font-semibold"
              role="alert"
            >
              <div className="flex">
                <div className="py-0.5">
                  <MdOutlineError className="w-5 h-5 mr-3 text-rose-500" />
                </div>
                <span>{errors.backend}</span>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiUser className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  onChange={handleChange}
                  value={data.name}
                  className="w-full pl-10 pr-4 py-3 text-zinc-800 bg-zinc-50 focus:bg-white border border-zinc-300 focus:border-zinc-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="User Khan"
                  autoComplete="off"
                />
              </div>
              {errors.name && (
                <p className="text-rose-600 text-xs mt-1.5 font-semibold">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <MdOutlineEmail className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  onChange={handleChange}
                  value={data.email}
                  className="w-full pl-10 pr-4 py-3 text-zinc-800 bg-zinc-50 focus:bg-white border border-zinc-300 focus:border-zinc-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="user@example.com"
                  autoComplete="off"
                />
              </div>
              {errors.email && (
                <p className="text-rose-600 text-xs mt-1.5 font-semibold">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  onChange={handleChange}
                  value={data.password}
                  className="w-full pl-10 pr-10 py-3 text-zinc-800 bg-zinc-50 focus:bg-white border border-zinc-300 focus:border-zinc-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-750 focus:outline-none cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiFillEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-600 text-xs mt-1.5 font-semibold">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-white bg-indigo-600 hover:bg-indigo-700 font-bold text-sm transition-all disabled:opacity-75 cursor-pointer mt-6"
            >
              {loading ? (
                <span className="flex items-center">
                  <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="mt-8 text-center border-t border-zinc-100 pt-6">
            <p className="text-zinc-500 text-sm font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
