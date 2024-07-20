import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">Task Manager</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Tasks</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">Create Task</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
