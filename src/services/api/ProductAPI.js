import axios from 'axios';
import * as UrlApi from '../url';

export const ProductService = {
  getProductsList: () => {
    return axios.get(UrlApi.URL_PRODUCTS);
  },
  getProductById: (id) => {
    return axios.get(UrlApi.URL_PRODUCTS_ID(id));
  },
};
