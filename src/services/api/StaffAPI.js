import axios from 'axios';
import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const StaffService = {
  postStaff: (staff) => {
    let { role, name, address, email, phone, gender, birthday } = staff;

    return baseRequest.post(UrlApi.URL_ADD_STAFF, {
      role: role,
      name: name,
      address: address,
      phone: phone,
      gender: gender,
      birthday: birthday,
      email: email,
    });
  },
  getStaffsList: () => {
    return baseRequest.get(UrlApi.URL_STAFFS);
  },
  getStaffById: (id) => {
    return baseRequest.get(UrlApi.URL_STAFFS_ID(id));
  },
  deleteStaff: (staffId) => {
    return baseRequest.post(UrlApi.URL_DELETE_STAFF, {
      staffId: staffId,
    });
  },

  putStaff: (editStaff) => {
    const { role, name, address, email, phone, gender, birthday, staffId } = editStaff;
    return axios.put(UrlApi.URL_PUT_STAFF, {
      role: role,
      name: name,
      address: address,
      email: email,
      phone: phone,
      gender: gender,
      birthday: birthday,
      staffId: staffId,
    });
  },
};
