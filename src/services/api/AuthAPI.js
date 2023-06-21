import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const AuthenticationService = {
  postLogin: (user) => {
    let { username, password } = user;

    return baseRequest.post(UrlApi.URL_AUTH_LOGIN, {
      username: username,
      password: password,
    });
  },
};
