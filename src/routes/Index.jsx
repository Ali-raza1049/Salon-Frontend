import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Customer
import Navbar from "../components/customer/Navbar.jsx";
import { HomePage } from "../pages/customer/HomePage.jsx";
import { BookPage } from "../pages/customer/BookPage.jsx";
import { BookingPage } from "../pages/customer/BookingPage.jsx";

// Admin
import AdminLayout from "../layout/AdminLayout.jsx";
import Dashboard from "../pages/owner/Dashboard.jsx";
import ManageService from "../pages/owner/ManageServices.jsx";
import Team from "../pages/owner/Team.jsx";
import Bookings from "../pages/owner/Bookings.jsx";
import Login from "../pages/owner/Login.jsx";
import ProtectedRoute from "../routes/ProtectedRoutes.jsx";

// Customer layout
const CustomerLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const AdminRoutes = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

const Index = () => (
  <Routes>
    {/* Customer routes */}
    <Route path="/" element={<CustomerLayout><HomePage /></CustomerLayout>} />
    <Route path="/book" element={<CustomerLayout><BookPage /></CustomerLayout>} />
    <Route path="/my-bookings" element={<CustomerLayout><BookingPage /></CustomerLayout>} />

    {/* Admin login */}
    <Route path="/admin/login" element={<Login />} />

    {/* Protected admin routes */}
    <Route path="/admin" element={<ProtectedRoute />}>
      <Route element={<AdminRoutes />}>
        <Route index element={<Dashboard />} />
        <Route path="manage-service" element={<ManageService />} />
        <Route path="team" element={<Team />} />
        <Route path="bookings" element={<Bookings />} />
      </Route>
    </Route>
  </Routes>
);

export default Index;
