import axios from 'axios';
import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const ReceiptService = {
  getReceipts: () => {
    return axios.get(UrlApi.URL_RECEIPTS);
  },
  createReceipt: (data) => {
    return baseRequest.post(UrlApi.URL_CREATE_RECEIPT, data);
  },
};
