import AuthLayout from '../layouts/AuthLayout';
// import Login from "~/pages/Login";
// import Register from "~/pages/Register";
import TestPage from '../pages/test';

const AuthenticationRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <TestPage />,
    },
    {
      path: '/register',
      element: <TestPage />,
    },
  ],
};

export default AuthenticationRoutes;
