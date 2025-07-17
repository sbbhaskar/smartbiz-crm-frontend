import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUserFromStorage } from '../utils/GetUserFromStorage';

const Navbar = () => {
  const user = getUserFromStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path) => location.pathname === path ? 'underline font-semibold' : '';

  return (
    <nav className={`px-4 py-3 shadow flex flex-wrap items-center justify-between ${darkMode ? 'bg-gray-900 text-white' : 'bg-indigo-700 text-white'}`}>
      <div className="flex items-center justify-between w-full sm:w-auto">
        <h1 className="text-lg font-bold">SmartBiz CRM</h1>
        <button
          className="sm:hidden ml-auto text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`w-full sm:flex sm:items-center sm:space-x-4 ${menuOpen ? 'block' : 'hidden'} sm:block mt-3 sm:mt-0`}>        
        <Link to="/" className={`block py-1 ${isActive('/')}`}>Home</Link>
        {!user && (
          <>
            <Link to="/register" className={`block py-1 ${isActive('/register')}`}>Register</Link>
            <Link to="/login" className={`block py-1 ${isActive('/login')}`}>Login</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard" className={`block py-1 ${isActive('/dashboard')}`}>Dashboard</Link>
            <Link to="/tasks" className={`block py-1 ${isActive('/tasks')}`}>Tasks</Link>
            {user.role === 'admin' && (
              <Link to="/admin" className={`block py-1 ${isActive('/admin')}`}>Admin</Link>
            )}
          </>
        )}
        <button onClick={toggleDarkMode} className="ml-2 text-sm px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>

      {user && (
        <div className="text-sm mt-3 sm:mt-0">
          <span className="mr-2">👤 {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
