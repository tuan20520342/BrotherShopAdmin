import { all } from 'redux-saga/effects';
import * as CategorySaga from './sagaActions/CategorySaga';
import * as StaffSaga from './sagaActions/StaffSaga';
import * as ProductSaga from './sagaActions/ProductSaga';
import * as AuthSaga from './sagaActions/AuthSaga';
import * as CustomerSaga from './sagaActions/CustomerSaga';
import * as ReceiptSaga from './sagaActions/ReceiptSaga';

export default function* rootSaga() {
  yield all([
    //Category
    CategorySaga.followActGetListCategories(),
    CategorySaga.followActUpdateCategory(),
    CategorySaga.followActRemoveCategory(),
    CategorySaga.followActCreateCategory(),
    //Staff
    StaffSaga.followActPostStaff(),
    StaffSaga.followActGetListStaffs(),
    StaffSaga.followActDeleteStaff(),
    StaffSaga.followActGetStaffById(),
    StaffSaga.followActPutStaff(),
    //Product
    ProductSaga.followActGetListProducts(),
    ProductSaga.followActGetProductById(),
    ProductSaga.followActCreateProduct(),
    //Authentication
    AuthSaga.followGetCurrentUser(),
    AuthSaga.followPutCurrentUser(),
    //Customer
    CustomerSaga.followActGetListCustomers(),
    CustomerSaga.followActGetCustomerById(),
    //Receipt
    ReceiptSaga.followActGetReceipts(),
    ReceiptSaga.followActCreateReceipt(),
    ReceiptSaga.followActGetReceiptById(),
  ]);
}
