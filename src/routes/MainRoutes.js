import MainLayout from '../layouts/MainLayout';
import TestPage from '~/pages/test';
import NotFoundPage from '~/pages/NotFound';
import StaffsPage from '~/pages/StaffsPage';
import AddItemForm from '~/pages/AddItemForm';
import AddStaffForm from '~/components/Staffs/AddStaffForm';
import ProductsPage from '~/pages/ProductsPage';
import AddProductForm from '~/components/Prouducts/AddProductForm';
import OrdersPage from '~/pages/OrdersPage';
import CustomersPage from '~/pages/CustomersPage';
import CategoriesPage from '~/pages/CategoriesPage';

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
      path: '/categories',
      element: <CategoriesPage />,
    },
    {
      path: '/orders',
      element: <OrdersPage />,
    },
    {
      path: '/customers',
      element: <CustomersPage />,
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
