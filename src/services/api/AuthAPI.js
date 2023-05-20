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
};
