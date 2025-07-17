// 📁 src/pages/TaskPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchTasks = () => {
    axios.get('http://localhost:3000/api/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!user) return <p className="text-center mt-10 text-red-600 font-semibold">You must be logged in to view tasks.</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-6">🗂️ Task Management</h1>

        {user.blocked ? (
          <div className="text-center text-red-500 font-medium bg-red-100 p-4 rounded-lg">
            You are blocked and cannot manage tasks.
          </div>
        ) : (
          <>
            <TaskForm
              fetchTasks={fetchTasks}
              editingTask={editingTask}
              clearEdit={() => setEditingTask(null)}
            />

            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TaskPage;