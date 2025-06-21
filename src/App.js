// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AllTransactions from './pages/AllTransactions'; // ✅ new import

export default function App() {
  const userId = localStorage.getItem('userId'); // Simple auth check

  return (
    <Routes>
      <Route path="/" element={!userId ? <AuthPage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={userId ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/transactions" element={userId ? <AllTransactions /> : <Navigate to="/" />} /> {/* ✅ new route */}
    </Routes>
  );
}
