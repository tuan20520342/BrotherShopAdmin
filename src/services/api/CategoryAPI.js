import Axios from 'axios';
import * as UrlApi from '../url';

export const CategoryService = {
  getCategoriesList: () => {
    return Axios.get(UrlApi.URL_CATEGORIES);
  },
  //   getInvoiceById: (id) => {
  //     return Axios.get(UrlApi.URL_GET_INVOICES_BY_ID(id));
  //   },
  //   postInvoice: (newInvoice) => {
  //     let { date, userId, total, details } = newInvoice;
  //     let currentUserId = parseInt(userId);
  //     const d = {
  //       date: date,
  //       userId: currentUserId,
  //       total: total,
  //       details: details,
  //     };
  //     return Axios.post(UrlApi.URL_POST_INVOICES, d);
  //   },
};
