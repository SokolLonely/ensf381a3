import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';

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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, navigate]);

  const handleLogin = async () => {
    if (!username || !password) {
      setMessageType('error');
      setMessage('Username and password cannot be empty.');
      return;
    }
    if (password.length < 8) {
      setMessageType('error');
      setMessage('Password must be at least 8 characters.');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const userFound = users.find(
        (user) =>
          user.username.toLowerCase() === username.toLowerCase() &&
          user.email === password
      );

      if (userFound) {
        setMessageType('success');
        setMessage('Login successful');
        setShouldRedirect(true);
      } else {
        setMessageType('error');
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
    }
  };

return (
  <div style={{ textAlign: 'center', marginTop: '40px', minHeight: '70vh' }}>
    <div className="login">
      <h2>Login</h2>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
      <div>
        <a>Forgot Password?</a>
      </div>
      {message && <DisplayStatus type={messageType} message={message} />}
    </div>
  </div>
);
}

export default LoginForm;