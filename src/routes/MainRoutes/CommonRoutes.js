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
import WarehouseReceiptsPage from '~/pages/WarehouseReceiptsPage';
import ProfilePage from '~/pages/ProfilePage';
import AddWarehouseReceipt from '~/components/WarehouseReceipt/AddWarehouseReceipt';
import EditProductPage from '~/pages/EditProductPage';
import EditStaffPage from '~/pages/EditStaffPage';
import CustomerDetailsPage from '~/pages/CustomerDetailsPage';
import WarehouseReceiptDetailsPage from '~/pages/WarehouseReceiptDetailsPage';
import OrderDetailsPage from '~/pages/OrderDetailsPage';

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
    element: <WarehouseReceiptsPage />,
  },
  {
    path: '/warehouse-receipt/:id',
    element: <WarehouseReceiptDetailsPage />,
  },
  {
    path: '/orders',
    element: <OrdersPage />,
  },
  {
    path: '/orders/:id',
    element: <OrderDetailsPage />,
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
