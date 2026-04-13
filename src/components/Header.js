import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

function Header() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header>
        <div className="header-left">
          <img width="50px" height="50px" src="/images/logo.jpeg" alt="Sweet Scoop Logo" />
          <h1>Sweet Scoop Ice Cream Shop</h1>
        </div>
        <div className="header-right">
          {userId ? (
            <button className="auth-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="auth-btn" onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
      </header>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/order-history">Order History</Link>
      </div>
    </>
  );
}

export default Header;