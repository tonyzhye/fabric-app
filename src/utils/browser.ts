export function queryString(): object {
  const parameters = window.location.search.substr(1).split('&');
  if (parameters === []) {
    return {};
  }

  const result = {};
  // tslint:disable-next-line:prefer-for-of
  for (var i = 0; i < parameters.length; ++i) {
    const p = parameters[i].split('=', 2);
    if (p.length !== 2) { 
      continue; 
    }
    result[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
  }
  return result;
}

export function getMobileClientHeight(): number {
  // browser client height minus mobile navbar height
  return document.documentElement!.clientHeight - 45;
}
