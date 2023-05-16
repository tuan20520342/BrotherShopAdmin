import axios from 'axios';
import * as UrlApi from '../url';
import Cookies from 'js-cookie';

export const StaffService = {
  postStaff: (staff) => {
    let { role, name, address, email, phone, gender, birthday } = staff;

    return axios.post(
      UrlApi.URL_ADD_STAFF,
      {
        role: role,
        name: name,
        address: address,
        phone: phone,
        gender: gender,
        birthday: birthday,
        email: email,
      },
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
  },
  getStaffsList: () => {
    return axios.get(
      UrlApi.URL_STAFFS,
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
  },
  getStaffById: (id) => {
    return axios.get(
      UrlApi.URL_STAFFS_ID(id),
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
  },
  //   getInvoiceById: (id) => {
  //     return axios.get(UrlApi.URL_GET_INVOICES_BY_ID(id));
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
  //     return axios.post(UrlApi.URL_POST_INVOICES, d);
  //   },
};
