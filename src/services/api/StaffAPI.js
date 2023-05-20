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
  deleteStaff: (staffId) => {
    return axios.post(
      UrlApi.URL_DELETE_STAFF,
      {
        staffId: staffId,
      },
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
  },

  putStaff: (editStaff) => {
    const { role, name, address, email, phone, gender, birthday, staffId } = editStaff;
    return axios.put(
      UrlApi.URL_PUT_STAFF,
      {
        role: role,
        name: name,
        address: address,
        email: email,
        phone: phone,
        gender: gender,
        birthday: birthday,
        staffId: staffId,
      },
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
  },
};
