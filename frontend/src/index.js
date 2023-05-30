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

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/', element: <Dashboard />, loader: verifyUser },
  { path: '/admin/applications', element: <Admin_Applications /> },
  { path: '/admin/students', element: <Admin_Students /> },
  { path: '/admin/accounts', element: <Admin_Accounts /> },
  { path: '/sign-up', element: <Signup /> }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
