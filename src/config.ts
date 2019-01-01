const conf = require('./conf.json');

export const isProduction = (process.env.NODE_ENV === 'production');

export const isDev = !isProduction;

export const cookieDomain = conf.cookieDomain;

export const tokenCookieName = conf.tokenCookieName;

export const apiRootUrl = conf.apiRootUrl;

export const loginRootUrl = conf.loginRootUrl;

export const siteUrl = conf.siteUrl;

export const gaCode = conf.gaCode;

// ipad should the same as desktop
export const isMobile = typeof navigator === 'undefined' || (
  navigator.userAgent.match(/Android/i)
    // || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    // || navigator.userAgent.match(/iPad/i)
    // || navigator.userAgent.match(/iPod/i)
    // || navigator.userAgent.match(/BlackBerry/i)
    // || navigator.userAgent.match(/Windows Phone/i)
);

export const isIPhone = typeof navigator === 'undefined' || (
  navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPod/i)
);
