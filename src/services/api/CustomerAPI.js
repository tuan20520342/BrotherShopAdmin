import axios from 'axios';
import * as UrlApi from '../url';
import Cookies from 'js-cookie';

export const CustomerService = {
  getCustomersList: () => {
    return axios.get(
      UrlApi.URL_CUSTOMERS,
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
  },
  getCustomerById: (id) => {
    return axios.get(
      UrlApi.URL_CUSTOMERS_ID(id),
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
  },
};
