import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    if (user) navigate("/admin", { replace: true });
  }, [user]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
            Welcome Back 💇‍♂️
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Login to manage your salon appointments
          </p>

          {isError && (
            <div className="text-red-500 mb-4 text-center">{message}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Don't have an account?{" "}
              <span className="text-pink-500 font-medium hover:underline cursor-pointer">
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration / Brand */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-pink-500 to-purple-600 text-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Elevate Your Salon Experience
          </h1>
          <p className="text-lg opacity-90">
            Book appointments, manage staff, and enjoy a seamless salon workflow
            with our modern booking platform.
          </p>
          <div className="mt-10 text-sm opacity-80">
            © 2026 Alshanab & Alsawad Salon
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;