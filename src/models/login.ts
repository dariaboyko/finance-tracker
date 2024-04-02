import { Dayjs } from 'dayjs';

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: Dayjs;
}
