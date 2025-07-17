import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TaskForm = ({ fetchTasks, editingTask, clearEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.role === 'admin') {
      axios.get('http://localhost:3000/api/users/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
    }
  }, [token, user?.role]);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setAssignedTo(editingTask.assignedTo?._id || '');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description };
    if (user?.role === 'admin') taskData.assignedTo = assignedTo;

    try {
      if (editingTask) {
        await axios.put(`http://localhost:3000/api/tasks/${editingTask._id}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Updated', 'Task updated successfully', 'success');
      } else {
        await axios.post('http://localhost:3000/api/tasks', taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Created', 'Task created successfully', 'success');
      }

      setTitle('');
      setDescription('');
      setAssignedTo('');
      clearEdit();
      fetchTasks();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to save task', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h2>
      <input className="w-full mb-2 p-2 border" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className="w-full mb-2 p-2 border" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      {user?.role === 'admin' && (
        <select className="w-full mb-2 p-2 border" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Assign to User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>
      )}
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        {editingTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
