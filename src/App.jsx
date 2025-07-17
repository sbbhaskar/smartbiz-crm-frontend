// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminUsers from "./AdminUsers"; // if added
import TaskList from "./TaskList";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Analytics from "./pages/Analytics"; // if added

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-indigo-600 p-4">
          <ul className="flex flex-wrap justify-center space-x-6 text-white text-lg">
            <li>
              <Link to="/" className="block p-2">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" className="block p-2">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="block p-2">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="block p-2">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin-users" className="block p-2">
                User Admin
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="block p-2">
                Tasks
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center text-3xl mt-10">
                Welcome to SmartBiz CRM
              </h1>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <PrivateRoute>
                <AdminUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
