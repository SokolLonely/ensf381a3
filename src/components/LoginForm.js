import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';

const API_BASE = 'http://localhost:5000';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        navigate('/flavors');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, navigate]);

  const handleLogin = async () => {
    if (!username || !password) {
      setMessageType('error');
      setMessage('Username and password cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store login state in localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        setMessageType('success');
        setMessage(data.message || 'Login successful.');
        setShouldRedirect(true);
      } else {
        setMessageType('error');
        setMessage(data.message || 'Invalid username or password.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="main-section" style={{ minHeight: '72vh' }}>
      <div>
        <h2>Login</h2>
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
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div>
          <a href="#">Forgot Password?</a>
        </div>
        <div>
          <p>Need an account? <Link to="/signup">Sign up</Link></p>
        </div>
        {message && <DisplayStatus type={messageType} message={message} />}
      </div>
    </div>
  );
}

export default LoginForm;