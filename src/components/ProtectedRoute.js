// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userRoleState } from '../atoms/state'; // Import your Recoil state or any other state management

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
  const userRole = useRecoilValue(userRoleState); // Replace with your role-checking logic

  if (userRole !== requiredRole) {
    // Redirect to the home page or any other route
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
