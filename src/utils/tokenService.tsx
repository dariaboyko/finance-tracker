import Cookies from 'js-cookie';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ID_KEY = 'user_id';
const USER_NAME_KEY = 'user_name';
const USER_EMAIL_KEY = 'user_email';
const USER_ROLE_KEY = 'user_role';

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, path: '/' });
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = (): void => {
  Cookies.remove(USER_ROLE_KEY, { path: '/' });
};

export const removeUserRole = (): void => {
  Cookies.remove(TOKEN_KEY, { path: '/' });
};

export const setRefreshToken = (refreshToken: string): void => {
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7, path: '/' });
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const setUserName = (refreshToken: string): void => {
  Cookies.set(USER_NAME_KEY, refreshToken, { expires: 7, path: '/' });
};

export const getUserName = (): string | undefined => {
  return Cookies.get(USER_NAME_KEY);
};

export const setUserId = (refreshToken: string): void => {
  Cookies.set(USER_ID_KEY, refreshToken, { expires: 7, path: '/' });
};

export const getUserId = (): string => {
  return Cookies.get(USER_ID_KEY) ?? '';
};

export const setUserEmail = (refreshToken: string): void => {
  Cookies.set(USER_EMAIL_KEY, refreshToken, { expires: 7, path: '/' });
};

export const getUserEmail = (): string | undefined => {
  return Cookies.get(USER_EMAIL_KEY);
};

export const setUserRole = (role: string): void => {
  Cookies.set(USER_ROLE_KEY, role);
};

export const getUserRole = (): string | undefined => {
  return Cookies.get(USER_ROLE_KEY);
};

export const removeRefreshToken = (): void => {
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};
