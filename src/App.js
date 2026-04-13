import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import FlavorsPage from './components/FlavorsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import './style.css';

// Redirects to /login if user is not logged in
function ProtectedRoute({ children }) {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/flavors"
          element={
            <ProtectedRoute>
              <FlavorsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;