import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '', blocked: false });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/users/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      // Error fetching users
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setFormData({ ...user, password: '' });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/users/users/${editingUserId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire('Updated!', 'User info has been updated.', 'success');
      setEditingUserId(null);
      fetchUsers();
    } catch {
      Swal.fire('Error', 'Could not update user', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'User will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/users/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire('Deleted!', 'User has been removed.', 'success');
      setUsers(users.filter((u) => u._id !== id));
    } catch {
      Swal.fire('Error', 'Could not delete user', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">👤 Admin – Manage Users</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Blocked</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">
                  {editingUserId === u._id ? (
                    <input name="name" value={formData.name} onChange={handleChange} className="border px-2 py-1" />
                  ) : (
                    u.name
                  )}
                </td>
                <td className="p-2">
                  {editingUserId === u._id ? (
                    <input name="email" value={formData.email} onChange={handleChange} className="border px-2 py-1" />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="p-2 capitalize">
                  {editingUserId === u._id ? (
                    <select name="role" value={formData.role} onChange={handleChange} className="border px-2 py-1">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td className="p-2 text-center">
                  {editingUserId === u._id ? (
                    <input
                      type="checkbox"
                      name="blocked"
                      checked={formData.blocked}
                      onChange={handleChange}
                    />
                  ) : u.blocked ? (
                    <span className="text-red-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-green-600 font-semibold">No</span>
                  )}
                </td>
                <td className="p-2 space-x-2">
                  {editingUserId === u._id ? (
                    <>
                      <button onClick={handleUpdate} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Save
                      </button>
                      <button onClick={() => setEditingUserId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(u)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(u._id)} className="bg-red-600 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
