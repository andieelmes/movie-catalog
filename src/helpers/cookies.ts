const getCookie = (name: string) => {
  const regex = `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`;
  const matches = document.cookie.match(new RegExp(regex));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

interface CookieOptions {
  path: string,
}

const setCookie = (name: string, value: string, options: CookieOptions = { path: '/' }) => {
  const encodedValue = encodeURIComponent(value);
  let updatedCookie = `${name}=${encodedValue}`;
  Object.keys(options).forEach(propKey => {
    const propValue = options[propKey as keyof CookieOptions];
    updatedCookie += `; ${propKey}=${propValue}`;
  });

  document.cookie = updatedCookie;
};

export default {
  get: getCookie,
  set: setCookie,
};
