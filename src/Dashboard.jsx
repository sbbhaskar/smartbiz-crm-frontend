import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return (window.location.href = '/login');
    axios
      .get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data))
      .catch(() => (window.location.href = '/login'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserData(null);
    window.location.href = '/login';
  };

  if (!userData) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-3xl font-semibold mb-6">Welcome, {userData.name}</h2>
        <p className="text-lg mb-2">Email: {userData.email}</p>
        <p className="text-lg mb-6 capitalize">Role: {userData.role}</p>

        {userData.role === 'admin' && (
          <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <h3 className="font-bold text-blue-800">Admin Panel</h3>
            <p className="text-sm text-blue-700">
              You have access to all users, analytics, and CRM controls.
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;