import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d'];

const Analytics = () => {
  const [userCount, setUserCount] = useState(0);
  const [taskStats, setTaskStats] = useState({ total: 0, pending: 0, completed: 0 });

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');

      const [userRes, taskRes] = await Promise.all([
        axios.get('http://localhost:3000/api/users/users', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:3000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUserCount(userRes.data.length);
      const tasks = taskRes.data;
      const completed = tasks.filter(t => t.status === 'completed').length;
      const pending = tasks.filter(t => t.status === 'pending').length;

      setTaskStats({
        total: tasks.length,
        completed,
        pending,
      });

    } catch (err) {
      console.error("Analytics fetch failed", err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">📊 SmartBiz CRM Analytics</h1>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-lg">Total Users</p>
            <p className="text-2xl font-bold text-indigo-700">{userCount}</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-lg">Total Tasks</p>
            <p className="text-2xl font-bold text-indigo-700">{taskStats.total}</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-lg">Completed Tasks</p>
            <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Task Status Overview</h2>
          <div className="flex flex-col lg:flex-row justify-around items-center">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  { name: 'Pending', value: taskStats.pending },
                  { name: 'Completed', value: taskStats.completed },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={300} height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Pending', value: taskStats.pending },
                    { name: 'Completed', value: taskStats.completed },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
