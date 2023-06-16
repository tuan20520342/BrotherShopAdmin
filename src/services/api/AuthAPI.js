import axios from 'axios';
import * as UrlApi from '../url';

export const AuthenticationService = {
  postLogin: (user) => {
    let { username, password } = user;

    return axios({
      url: UrlApi.URL_AUTH_LOGIN,
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    });
  },

  forgotPassword: (data) => {
    return axios.post(UrlApi.URL_FORGOT_PASSWORD, data);
  },

  resetPassword: (data) => {
    return axios.post(UrlApi.URL_RESET_PASSWORD, data);
  },
};
