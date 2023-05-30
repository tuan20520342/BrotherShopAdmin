import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const ProductService = {
  getProductsList: () => {
    return baseRequest.get(UrlApi.URL_PRODUCTS);
  },
  getProductById: (id) => {
    return baseRequest.get(UrlApi.URL_PRODUCTS_ID(id));
  },
  createProduct: (data) => {
    return baseRequest.post(UrlApi.URL_CREATE_PRODUCT, data);
  },
  updateProduct: (data) => {
    return baseRequest.put(UrlApi.URL_UPDATE_PRODUCT(data.id), data);
  },
};
