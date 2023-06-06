// Important imports for the web app
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './index.css';

// Pages for routing and navigation
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import DashboardAdviser from './pages/dashboards/Adviser_Dashboard'
import StudentProfile from './components/student_profile';

const verifyUser = async () => {
  const res = await fetch("http://localhost:3001/api/accounts",
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
  const res = await fetch("http://localhost:3001/api/accounts",
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
  { path: "/da", element: <DashboardAdviser /> },
  { path: "/student", element: <StudentProfile /> }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
