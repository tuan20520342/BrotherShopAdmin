import LoginPage from '~/pages/LoginPage';
import AuthLayout from '../layouts/AuthLayout';

const AuthenticationRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />,
    },
  ],
};

export default AuthenticationRoutes;
