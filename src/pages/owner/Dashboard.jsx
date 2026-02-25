// src/components/dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/slice/DashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Map day number to day name (backend: 1=Mon, 7=Sun)
  const dayMap = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
  };

  // Prepare chart data
  const chartData =
    stats?.weeklyBookings?.map((item) => ({
      day: dayMap[item.day] || "N/A",
      bookings: item.bookings,
    })) || [];

  return (
    <div className="space-y-8 p-6">
      {/* Loading & Error */}
      {loading && <p className="text-gray-500">Loading dashboard...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">
            ${stats?.totalRevenue || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-bold">
            {stats?.totalBookings || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">New Customers</p>
          <h2 className="text-2xl font-bold">--</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Growth</p>
          <h2 className="text-2xl font-bold text-green-600">--</h2>
        </div>
      </div>

      {/* Weekly Booking Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-6">
          Weekly Booking Overview
        </h2>

        <div className="w-full" style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#f59e0b"
                fill="#fde68a"
                fillOpacity={0.4}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;