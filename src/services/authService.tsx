import axios, { AxiosError } from 'axios';
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
  getRefreshToken,
  setUserName,
  setUserId,
  setUserEmail
} from 'utils/tokenService';
import { BASE_API_URL } from 'apiConfig';
import { LoginRequest, LoginResponse, ErrorDTO } from 'models';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';

let tokenExpirationTimer: NodeJS.Timeout;
const mockToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdHF3ZXJ0eSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3Rxd2VydHkxMjNAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAyYTAwZjI0LTI4NjQtNDVkYi04MGI4LWY4ZDcyZDA3ZWJiMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3MDgyNjMzNjAsImlzcyI6ImN1c3RvbWVyIGF1dGhlbnRpY2F0ZSBhcGkiLCJhdWQiOiJURVNUIn0.zIHLG2DPDdSGE2gy-kNOVY_HVUSkokCo_rewIZX-i0U';

export const login = async (credentials: LoginRequest): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_API_URL}/api/auth/login`, credentials);

    const { token, refreshToken } = response.data;

    setToken(token.replace('Bearer ', ''));
    setRefreshToken(refreshToken);
    const decodedToken = decodeJwt(token.replace('Bearer ', ''));
    if (decodedToken) {
      const { exp, nameidentifier, name } = decodedToken;
      if (exp) {
        const timeUntilExpiration = exp * 1000 - Date.now();
        tokenExpirationTimer = setTimeout(() => refreshTokenFunc(), timeUntilExpiration - 60000);
      }
      if (nameidentifier && name) {
        setUserName(name);
        setUserId(name);
      }
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    setToken(mockToken.replace('Bearer ', ''));
    setRefreshToken('refreshToken');
    const decodedToken = decodeJwt(mockToken.replace('Bearer ', ''));
    if (decodedToken) {
      const { exp, nameidentifier, name, email } = decodedToken;
      if (exp) {
        const timeUntilExpiration = exp * 1000 - Date.now();
        tokenExpirationTimer = setTimeout(() => refreshTokenFunc(), timeUntilExpiration - 60000);
      }
      if (nameidentifier && name && email) {
        setUserName(name);
        setUserId(nameidentifier);
        setUserEmail(email);
      }
    }

    if (axiosError && axiosError.response && axiosError.response.status === 409) {
      message.error('Incorrect email or password.');
    } else {
      message.error('Server error. Please try again in a couple of minutes.');
    }
  }
};

export const refreshTokenFunc = async (): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_API_URL}/api/auth/refresh-token`, {
      refreshToken: getRefreshToken()
    });
    const { token, refreshToken } = response.data;
    setToken(token);
    setRefreshToken(refreshToken);
    const decodedToken = decodeJwt(token);
    if (decodedToken) {
      const { exp } = decodedToken;
      if (exp) {
        const timeUntilExpiration = exp * 1000 - Date.now();
        tokenExpirationTimer = setTimeout(() => refreshTokenFunc(), timeUntilExpiration - 60000);
      }
    }
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
  }
};

export const signup = async (credentials: LoginRequest): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_API_URL}/api/auth/register`,
      credentials
    );

    const { token, refreshToken } = response.data;

    setToken(token);
    setRefreshToken(refreshToken);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError && axiosError.response && axiosError.response.status === 422) {
      message.error((axiosError.response.data as ErrorDTO).message);
    } else {
      message.error('Server error. Please try again in a couple of minutes.');
    }
  }
};

export const logout = () => {
  clearTimeout(tokenExpirationTimer);
  removeToken();
  removeRefreshToken();
};

const decodeJwt = (
  token: string
): { exp: number; nameidentifier: string; name: string; email: string } | null => {
  try {
    const decoded = jwtDecode(token) as any;
    return {
      exp: decoded.exp,
      nameidentifier:
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    };
  } catch (error) {
    return null;
  }
};
