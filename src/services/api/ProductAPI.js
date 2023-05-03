import Axios from 'axios';
import * as UrlApi from '../url';

export const ProductService = {
  getProductsList: () => {
    return Axios.get(UrlApi.URL_PRODUCTS);
  },
  getProductById: (id) => {
    return Axios.get(UrlApi.URL_PRODUCTS_ID(id));
  },
};
