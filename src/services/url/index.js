export const DOMAIN_NAME = 'http://localhost:3001';

//AUTHENTICATION
export const URL_AUTH_LOGIN = `${DOMAIN_NAME}/auth/staffs/login`;

//PRODUCT
export const URL_PRODUCTS = `${DOMAIN_NAME}/products`;
export const URL_PRODUCTS_ID = (id) => `${DOMAIN_NAME}/products/${id}`;
export const URL_CREATE_PRODUCT = '/products/create';
export const URL_UPDATE_PRODUCT = (id) => `/products/${id}`;

//CATEGORIES
export const URL_CATEGORIES = `${DOMAIN_NAME}/categories`;
export const URL_UPDATE_CATEGORY = `${DOMAIN_NAME}/categories/update`;
export const URL_REMOVE_CATEGORY = `${DOMAIN_NAME}/categories/delete`;
export const URL_CREATE_CATEGORY = `${DOMAIN_NAME}/categories/create`;

//STAFF
export const URL_ADD_STAFF = `${DOMAIN_NAME}/staffs/create`;
export const URL_STAFFS = `${DOMAIN_NAME}/staffs`;
export const URL_STAFFS_ID = (id) => `${DOMAIN_NAME}/staffs/${id}`;
export const URL_DELETE_STAFF = `${DOMAIN_NAME}/staffs/delete`;
export const URL_PUT_STAFF = `${DOMAIN_NAME}/staffs/update`;

//CUSTOMER
export const URL_CUSTOMERS = `${DOMAIN_NAME}/customer`;
export const URL_CUSTOMERS_ID = (id) => `${DOMAIN_NAME}/customer/${id}`;

// RECEIPT
export const URL_RECEIPTS = `${DOMAIN_NAME}/receipts`;
export const URL_CREATE_RECEIPT = '/receipts/create';
export const URL_RECEIPTS_ID = (id) => `${DOMAIN_NAME}/receipts/${id}`;
export const URL_PUT_RECEIPT = `${DOMAIN_NAME}/receipts/update`;

// ORDER
export const URL_ORDERS = `${DOMAIN_NAME}/orders`;
export const URL_ORDERS_ID = (id) => `${DOMAIN_NAME}/orders/${id}`;
