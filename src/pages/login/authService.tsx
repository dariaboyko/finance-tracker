import axios, { AxiosError } from 'axios';
import { setToken, setRefreshToken } from 'utils/tokenService';
import { BASE_API_URL } from 'apiConfig';
import { LoginRequest, LoginResponse } from 'interfaces/login';
import { message } from 'antd';

export const login = async (credentials: LoginRequest): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_API_URL}/api/auth/login`, credentials);

    const { token, refreshToken } = response.data;

    setToken(token);
    setRefreshToken(refreshToken);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError && axiosError.response && axiosError.response.status === 409) {
      message.error('Incorrect email or password.');
    } else message.error('Server error. Please try again in a couple of minutes.');
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
    message.error('Server error. Please try again in a couple of minutes.');
  }
};
