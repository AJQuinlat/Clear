// Important imports for the web app
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './index.css';

// Pages for routing and navigation
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Admin_Applications from './pages/Admin_Applications';
import Admin_Students from './pages/Admin_Students'
import Admin_Accounts from './pages/Admin_Accounts'
import DashboardAdviser from './pages/dashboards/Adviser_Dashboard'

const verifyUser = async () => {
  const res = await fetch("http://localhost:3001/api/heartbeat",
    {
      method: "GET",
      credentials: "include"
    });


  const payload = await res.json();
  if (payload.userInfo !== null && payload.userInfo !== undefined) {
    return true
  } else {
    return redirect("/login")
  }
}

const verifyUserOnLogin = async () => {
  const res = await fetch("http://localhost:3001/api/heartbeat",
    {
      method: "GET",
      credentials: "include"
    });


  const payload = await res.json();
  if (payload.userInfo !== null && payload.userInfo !== undefined) {
    return redirect("/")
  } else {
    return false
  }
}

const router = createBrowserRouter([
  { path: '/login', element: <Login />, loader: verifyUserOnLogin },
  { path: '/sign-up', element: <Signup />, loader: verifyUserOnLogin },
  { path: '/', element: <Dashboard />, loader: verifyUser },
  { path: '/admin/applications', element: <Admin_Applications /> },
  { path: '/admin/students', element: <Admin_Students /> },
  { path: '/admin/accounts', element: <Admin_Accounts /> },
  { path: "/da", element: <DashboardAdviser /> }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
