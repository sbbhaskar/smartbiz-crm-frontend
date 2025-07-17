import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/api/tasks', { title }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTitle('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const exportToCSV = () => {
    const csv = ["Title"].concat(tasks.map(task => task.title)).join("\n");
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'tasks.csv');
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    saveAs(blob, 'tasks.json');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mt-10 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
      <form onSubmit={addTask} className="flex space-x-2 mb-4">
        <input type="text" placeholder="New Task" value={title} onChange={(e) => setTitle(e.target.value)} required className="flex-grow p-2 border rounded" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between items-center mb-2">
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)} className="text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex space-x-4">
        <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded">Export CSV</button>
        <button onClick={exportToJSON} className="bg-blue-600 text-white px-4 py-2 rounded">Export JSON</button>
      </div>
    </div>
  );
};

export default TaskList;
