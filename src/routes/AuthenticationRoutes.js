import LoginPage from '~/pages/LoginPage';
import AuthLayout from '../layouts/AuthLayout';
import TestPage from '../pages/test';

const AuthenticationRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <TestPage />,
    },
  ],
};

export default AuthenticationRoutes;
