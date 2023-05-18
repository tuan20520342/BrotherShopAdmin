export const DOMAIN_NAME = 'http://localhost:3001';

//LOAI DOC GIA
// export const URL_TYPE_READER = `${DOMAIN_NAME}/loaidocgia`;
// export const URL_TYPE_READER_BY_ID = (id) => `${DOMAIN_NAME}/loaidocgia/${id}`;

//AUTHENTICATION
export const URL_AUTH_LOGIN = `${DOMAIN_NAME}/auth/staffs/login`;

//PRODUCT
export const URL_PRODUCTS = `${DOMAIN_NAME}/products`;
export const URL_PRODUCTS_ID = (id) => `${DOMAIN_NAME}/products/${id}`;

//CATEGORIES
export const URL_CATEGORIES = `${DOMAIN_NAME}/categories`;

//STAFF
export const URL_ADD_STAFF = `${DOMAIN_NAME}/staffs/create`;
export const URL_STAFFS = `${DOMAIN_NAME}/staffs`;
export const URL_STAFFS_ID = (id) => `${DOMAIN_NAME}/staffs/${id}`;
export const URL_DELETE_STAFF = `${DOMAIN_NAME}/staffs/delete`;
export const URL_PUT_STAFF = `${DOMAIN_NAME}/staffs/update`;
