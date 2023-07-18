export const DOMAIN_NAME = 'https://brother-shop-102.onrender.com';

//AUTHENTICATION
export const URL_AUTH_LOGIN = `${DOMAIN_NAME}/auth/staffs/login`;
export const URL_FORGOT_PASSWORD = `${DOMAIN_NAME}/auth/forgot-password`;
export const URL_RESET_PASSWORD = `${DOMAIN_NAME}/auth/reset-password`;
export const URL_CHANGE_PASSWORD = `${DOMAIN_NAME}/staffs/change-password`;

//PRODUCT
export const URL_PRODUCTS = `${DOMAIN_NAME}/products`;
export const URL_PRODUCTS_ID = (id) => `${DOMAIN_NAME}/products/${id}`;
export const URL_CREATE_PRODUCT = '/products/create';
export const URL_UPDATE_PRODUCT = (id) => `/products/${id}`;
export const URL_STOP_SELLING_PRODUCT = (id) => `/products/${id}`;
export const URL_RESELL_PRODUCT = (id) => `/products/resell/${id}`;

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
export const URL_UPDATE_ORDER_STATUS = (id) => `${DOMAIN_NAME}/orders/${id}/status`;

// DASHBOARD
export const URL_GET_STAT_CARD_DATA = '/dashboard/stat-card';
export const URL_GET_REVENUE = '/dashboard/revenue';
export const URL_GET_BEST_SELLER_PRODUCTS = '/dashboard/best-seller';
export const URL_GET_PERCENTAGE_CATEGORIES = '/dashboard/category/percentage';
export const URL_GET_SOLD_QUANTITY_PRODUCTS = '/dashboard/sold-quantity';
export const URL_GET_TREND_OF_CATEGORIES = '/dashboard/trend-of-categories';

// PROMOTION
export const URL_GET_PROMOTIONS = `${DOMAIN_NAME}/promotions`;
export const URL_PROMOTIONS_ID = (id) => `${DOMAIN_NAME}/promotions/${id}`;
export const URL_CREATE_PROMOTION = `/promotions`;
export const URL_EDIT_PROMOTION = (id) => `${DOMAIN_NAME}/promotions/${id}`;
export const URL_DELETE_PROMOTION = (id) => `${DOMAIN_NAME}/promotions/${id}`;
export const URL_RESTORE_PROMOTION = (id) => `${DOMAIN_NAME}/promotions/${id}/restore`;
