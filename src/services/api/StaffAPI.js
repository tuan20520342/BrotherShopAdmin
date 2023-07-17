import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const StaffService = {
  postStaff: (staff) => {
    const { name, address, email, phone, gender, birthday } = staff;

    return baseRequest.post(UrlApi.URL_ADD_STAFF, {
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
    const { name, address, email, phone, gender, birthday, staffId, status } = editStaff;
    return baseRequest.put(UrlApi.URL_PUT_STAFF, {
      name: name,
      address: address,
      email: email,
      phone: phone,
      gender: gender,
      birthday: birthday,
      staffId: staffId,
      status: status,
    });
  },
};
