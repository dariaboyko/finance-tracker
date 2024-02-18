import Cookies from 'js-cookie';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, path: '/' });
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY, { path: '/' });
};

export const setRefreshToken = (refreshToken: string): void => {
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7, path: '/' });
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = (): void => {
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};
