import MainLayout from '../layouts/MainLayout';
import TestPage from '~/pages/test';
import NotFoundPage from '~/pages/NotFound';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <TestPage />,
    },
    {
      path: '/about',
      element: <TestPage />,
    },
    {
      path: '/my-account',
      element: <TestPage />,
    },
    {
      path: '/wishlist',
      element: <TestPage />,
    },
    {
      path: '/cart',
      element: <TestPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: '/contact',
      element: <TestPage />,
    },
    {
      path: '/checkout',
      element: <TestPage />,
    },
    {
      path: '/shop',
      element: <TestPage />,
    },
    {
      path: '/product/:id',
      element: <TestPage />,
    },
  ],
};

export default MainRoutes;
