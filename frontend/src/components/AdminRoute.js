import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  
  console.log('AdminRoute check - isLoggedIn:', isLoggedIn);
  
  if (!isLoggedIn) {
    console.log('Not logged in, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log('Logged in, rendering children');
  return children;
};

export default AdminRoute;