import CommonRoutes from './CommonRoutes';
import AuthGuard from '~/routes/AuthGuard';

const MainRoutes = () => {
  return {
    path: '/',
    element: <AuthGuard />,
    children: CommonRoutes,
  };
};

export default MainRoutes;
