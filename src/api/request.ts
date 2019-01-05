import axios from 'axios';
import Cookies from 'js-cookie';
import { isEmpty, isNil } from 'ramda';

import { apiRootUrl, tokenCookieName, cookieDomain } from '../config';
import { ErrorResponse, RestError, StatusNetworkError } from '../types';
import { ErrMsgNetworkError } from '../constants';

function toRestError(res: ErrorResponse): RestError {
  if (!isNil(res.response)) {
    return { 
      status: res.response.status, 
      message: res.response.data.message 
    };
  } else {
    return { 
      status: StatusNetworkError, 
      message: ErrMsgNetworkError 
    };
  }
}

export function getToken(): string {
  const token = Cookies.get(tokenCookieName);
  return (token) ? token : '';
}

let isTokenSet = false;

axios.interceptors.response.use(undefined, (error: ErrorResponse) => {
  return Promise.reject(toRestError(error));
});

export function initRestAdapter() {
  if (!isTokenSet) {
    axios.defaults.baseURL = apiRootUrl;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const token = getToken();
    if (!isEmpty(token)) {
      // tslint:disable-next-line:no-string-literal
      axios.defaults.headers.common['Authorization'] = token;
      isTokenSet = true;
    }
  }
}

export function removeToken() {
  Cookies.remove(tokenCookieName, { domain: cookieDomain });
  // tslint:disable-next-line:no-string-literal
  axios.defaults.headers.common['Authorization'] = '';
  isTokenSet = false;
}
