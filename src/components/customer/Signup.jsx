import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(form);
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE - SIGNUP FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account ✨
          </h2>

          <p className="text-gray-500 mb-8">
            Join our salon booking platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-sm text-gray-600">Select Role</label>

              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Customer"
                    checked={form.role === "Customer"}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                    className="accent-pink-500"
                  />
                  Customer
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Owner"
                    checked={form.role === "Owner"}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                    className="accent-pink-500"
                  />
                  Owner
                </label>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
            >
              Sign Up
            </button>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-pink-500 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - BRAND SECTION */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-pink-500 to-purple-600 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Start Your Salon Journey Today
          </h1>

          <p className="text-lg opacity-90">
            Whether you're a customer booking appointments or a salon owner managing your business — we've got you covered.
          </p>

          <div className="mt-10 text-sm opacity-80">
            © 2026 Alshanab & Alsawad Salon
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;