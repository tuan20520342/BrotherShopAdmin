import TestPage from '~/pages/test';
import NotFoundPage from '~/pages/NotFound';
import StaffsPage from '~/pages/StaffsPage';
import AddItemForm from '~/pages/AddItemForm';
import AddStaffForm from '~/components/Staffs/AddStaffForm';
import ProductsPage from '~/pages/ProductsPage';
import AddProductForm from '~/components/Products/AddProductForm';
import OrdersPage from '~/pages/OrdersPage';
import CustomersPage from '~/pages/CustomersPage';
import CategoriesPage from '~/pages/CategoriesPage';
import WearhouseReceiptsPage from '~/pages/WarehouseReceiptsPage';
import ProfilePage from '~/pages/ProfilePage';
import AddWarehouseReceipt from '~/components/WarehouseReceipt/AddWarehouseReceipt';
import EditProductPage from '~/pages/EditProductPage';
import EditStaffPage from '~/pages/EditStaffPage';
import CustomerDetailsPage from '~/pages/CustomerDetailsPage';

const CommonRoutes = [
  {
    path: '/',
    element: <TestPage />,
  },
  {
    path: '/staffs',
    element: <StaffsPage />,
  },
  {
    path: '/staffs/:id',
    element: <EditStaffPage />,
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
    path: '/products/:id',
    element: <EditProductPage />,
  },
  {
    path: '/categories',
    element: <CategoriesPage />,
  },
  {
    path: '/warehouse-receipt',
    element: <WearhouseReceiptsPage />,
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
    path: '/customers/:id',
    element: <CustomerDetailsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/add-warehouse-receipt',
    element: <AddItemForm title={'Thêm phiếu nhập kho'} form={<AddWarehouseReceipt />} />,
  },
];

export default CommonRoutes;
