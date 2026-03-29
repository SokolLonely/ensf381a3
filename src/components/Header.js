import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
          <img width="50px" height="50px" src="/images/logo.jpeg" alt="Sweet Scoop Logo" />
          <h1>Sweet Scoop Ice Cream Shop</h1>
      </header>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}

export default Header;