import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import UserProfile from './pages/UserProfile/UserProfile';
import Users from './pages/Users/Users';
import Agent from './pages/Agent/Agent';

// ----------------------------------------------------------------------

const routes = ({ isAuthenticated }) => [
  {
    path: '/dashboard',
    element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
    // element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard/app" replace /> },
      { path: 'app', element: <DashboardApp /> },
      { path: 'users', element: <Users /> },
      { path: 'user', element: <User /> },
      { path: 'agent', element: <Agent /> },
      { path: 'products', element: <Products /> },
      { path: 'blog', element: <Blog /> },
      { path: 'profile', element: <UserProfile /> }
    ]
  },
  {
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: '404', element: <NotFound /> }
      // { path: 'register', element: <Register /> },
      // { path: '/', element: <Navigate to="/dashboard" /> },
    ]
  },

  { path: '*', element: <Navigate to="/404" replace /> }
];

export default routes;
