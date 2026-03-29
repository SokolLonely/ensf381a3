import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="flexbox_homepage_header">
        <img width="50px" height="50px" src="/logo.jpeg" alt="Sweet Scoop Logo" style={{ borderRadius: '50%' }} />
        <b>Sweet Scoop Ice Cream</b>
      </div>
      <div className="homepage_menu">
        <Link to="/">Homepage</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
}

export default Header;