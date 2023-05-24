// Important imports for the web app
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

// Pages for routing and navigation
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Admin_Applications from './pages/Admin_Applications';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/', element: <Dashboard /> },
  { path: '/admin/applications', element: <Admin_Applications /> },
  { path: '/sign-up', element: <Signup /> }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
