import axios from 'axios';
import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const OrderService = {
  getOrders: () => {
    return axios.get(UrlApi.URL_ORDERS);
  },
  getOrderById: (id) => {
    return axios.get(UrlApi.URL_ORDERS_ID(id));
  },
};
