import React from 'react'
import { Navigate, Route } from 'react-router-dom'

// Protected Route Component
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token') // Check if token exists in localStorage

  // If token is not valid or doesn't exist, redirect to login page
  if (!token) {
    return <Navigate to="/login" />
  }

  // If token exists and is valid, render the protected component
  return <Route {...rest} element={Component} />
}

export default PrivateRoute
