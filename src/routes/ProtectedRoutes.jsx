import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  // Wait for auth state to load to prevent redirect loops
  if (isLoading) return null;

  // If user exists, render nested routes, else redirect to login
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
