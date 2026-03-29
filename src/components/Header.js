import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <div className="flexbox_homepage_header">
            <img src="/logo.jpeg" alt="Sweet Scoop Logo" style={{ width: '25px'}} />
            <h2>Sweet Scoop Ice Cream Shop</h2>
        </div>
      </header>
      <div className="homepage_menu">
        <Link to="/">Home</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}

export default Header;