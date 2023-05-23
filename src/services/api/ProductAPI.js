import axios from 'axios';
import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const ProductService = {
  getProductsList: () => {
    return axios.get(UrlApi.URL_PRODUCTS);
  },
  getProductById: (id) => {
    return axios.get(UrlApi.URL_PRODUCTS_ID(id));
  },
  createProduct: (data) => {
    return baseRequest.post(UrlApi.URL_CREATE_PRODUCT, data);
  },
};
