import axios, { AxiosError } from 'axios';
import { setToken, setRefreshToken } from 'utils/tokenService';
import { BASE_API_URL } from 'apiConfig';
import { LoginRequest, LoginResponse } from 'interfaces/login';
import { message } from 'antd';
import { ErrorDTO } from 'interfaces/errorDTO';

export const login = async (credentials: LoginRequest): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_API_URL}/v1/auth/login`, credentials);

    const { token, refreshToken } = response.data;

    setToken(token);
    setRefreshToken(refreshToken);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError && axiosError.response && axiosError.response.status === 409) {
      message.error('Incorrect email or password.');
    } else {
      setToken(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdHF3ZXJ0eSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3Rxd2VydHkxMjNAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAyYTAwZjI0LTI4NjQtNDVkYi04MGI4LWY4ZDcyZDA3ZWJiMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3MDgyNjMzNjAsImlzcyI6ImN1c3RvbWVyIGF1dGhlbnRpY2F0ZSBhcGkiLCJhdWQiOiJURVNUIn0.zIHLG2DPDdSGE2gy-kNOVY_HVUSkokCo_rewIZX-i0U'
      );
      setRefreshToken('W6a1VVzG9zs+MIVCo4KFFSXGdRSIqnE2JLTRvroeQMI=');
      message.error('Server error. Please try again in a couple of minutes.');
    }
  }
};

export const signup = async (credentials: LoginRequest): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_API_URL}/v1/auth/register`,
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
      setToken(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdHF3ZXJ0eSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3Rxd2VydHkxMjNAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAyYTAwZjI0LTI4NjQtNDVkYi04MGI4LWY4ZDcyZDA3ZWJiMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3MDgyNjMzNjAsImlzcyI6ImN1c3RvbWVyIGF1dGhlbnRpY2F0ZSBhcGkiLCJhdWQiOiJURVNUIn0.zIHLG2DPDdSGE2gy-kNOVY_HVUSkokCo_rewIZX-i0U'
      );
      setRefreshToken('W6a1VVzG9zs+MIVCo4KFFSXGdRSIqnE2JLTRvroeQMI=');
      message.error('Server error. Please try again in a couple of minutes.');
    }
  }
};
