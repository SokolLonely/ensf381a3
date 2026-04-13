import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';

const API_BASE = 'http://localhost:5000';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const isValidUsername = (u) => {
    const pattern = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    return pattern.test(u);
  };

  const isValidEmail = (e) => {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return pattern.test(e);
  };

  const isValidPassword = (p) => {
    if (p.length < 8) return false;
    if (!/[A-Z]/.test(p)) return false;
    if (!/[a-z]/.test(p)) return false;
    if (!/[0-9]/.test(p)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(p)) return false;
    return true;
  };

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setMessageType('error');
      setMessage('All fields are required.');
      return;
    }
    if (!isValidUsername(username)) {
      setMessageType('error');
      setMessage('Username must be 3-20 characters, start with a letter, and contain only letters, numbers, underscores, or hyphens.');
      return;
    }
    if (!isValidEmail(email)) {
      setMessageType('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    if (!isValidPassword(password)) {
      setMessageType('error');
      setMessage('Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }
    if (password !== confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessageType('success');
        setMessage(data.message || 'Registration successful. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setMessageType('error');
        setMessage(data.message || data.error || 'Signup failed.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="main-section" style={{ minHeight: '72vh' }}>
      <div>
        <h2>Sign Up</h2>
        <div>
          <label>Username</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        {message && <DisplayStatus type={messageType} message={message} />}
      </div>
    </div>
  );
}

export default SignupForm;