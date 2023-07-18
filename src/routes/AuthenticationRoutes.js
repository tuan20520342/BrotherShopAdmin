import LoginPage from '~/pages/LoginPage';
import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordPage from '~/pages/ForgotPasswordPage';
import ResetPasswordPage from '~/pages/ResetPasswordPage';

const AuthenticationRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/forget-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/reset-password/:token',
      element: <ResetPasswordPage />,
    },
  ],
};

export default AuthenticationRoutes;
