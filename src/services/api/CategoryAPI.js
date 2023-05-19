import axios from 'axios';
import * as UrlApi from '../url';
import Cookies from 'js-cookie';

export const CategoryService = {
  getCategoriesList: () => {
    return axios.get(UrlApi.URL_CATEGORIES);
  },
  updateCategory: (data) => {
    return axios.put(UrlApi.URL_UPDATE_CATEGORY, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
  },
  removeCategory: (data) => {
    return axios.post(UrlApi.URL_REMOVE_CATEGORY, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
  },
};
