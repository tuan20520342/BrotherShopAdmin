import MainLayout from '../layouts/MainLayout';
import TestPage from '~/pages/test';
import NotFoundPage from '~/pages/NotFound';
import StaffsPage from '~/pages/StaffsPage';
import AddItemForm from '~/pages/AddItemForm';
import AddStaffForm from '~/components/Staffs/AddStaffForm';
import ProductsPage from '~/pages/ProductsPage';
import AddProductForm from '~/components/Prouducts/AddProductForm';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <TestPage />,
    },
    {
      path: '/staffs',
      element: <StaffsPage />,
    },
    {
      path: '/add-staff',
      element: <AddItemForm title={'Thêm nhân viên'} form={<AddStaffForm />} />,
    },
    {
      path: '/products',
      element: <ProductsPage />,
    },
    {
      path: '/add-product',
      element: <AddItemForm title={'Thêm sản phẩm'} form={<AddProductForm />} />,
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
