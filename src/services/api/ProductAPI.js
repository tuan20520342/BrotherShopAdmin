import Axios from 'axios';
import * as UrlApi from '../url';

export const ProductService = {
  getProductsList: () => {
    return Axios.get(UrlApi.URL_PRODUCTS);
  },
};
