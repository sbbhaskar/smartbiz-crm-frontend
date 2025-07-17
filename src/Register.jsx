// src/Register.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Clean state + clear DOM autofill refs
  useEffect(() => {
    setForm({ name: '', email: '', password: '', role: 'user' });
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return Swal.fire('Weak Password', 'Password must be at least 6 characters long.', 'warning');
    }

    try {
      const res = await axios.post('http://localhost:3000/api/users/register', form);
      Swal.fire('Success', res.data.message || 'Registered successfully!', 'success');

      // Reset form fields
      setForm({ name: '', email: '', password: '', role: 'user' });
      if (nameRef.current) nameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-6 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          ref={nameRef}
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded"
          autoComplete="off"
          required
        />
        <input
          ref={emailRef}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded"
          autoComplete="off"
          required
        />
        <input
          ref={passwordRef}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded"
          autoComplete="new-password"
          required
        />
        <select
          name="role"
          onChange={handleChange}
          value={form.role}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
