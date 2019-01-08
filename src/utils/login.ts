import { isMobile } from '../config';
import { loginRootUrl } from '../config';
import { queryString } from './browser';
import { isNilOrEmpty } from './object';

export interface UrlPath {
  url?: string;
}

export enum LoginSNS {
  Github = 1
}

function defaultUrl(): string {
  const urlPath = '/';
  const host = window.location.host;
  const protocol = window.location.protocol;
  return encodeURIComponent(`${protocol}//${host}${urlPath}`);
}

export function getLoginUrl(loginPath: string): string {
  const path = (queryString() as UrlPath).url;
  const url = (!isNilOrEmpty(path)) ? encodeURIComponent(path!) : defaultUrl();
  return `${loginRootUrl}${loginPath}/redirect_url/${url}`;
}

export function getWebSiginUrl(): string {
  return (isMobile) ? '/m/signin' : '/signin';
}
