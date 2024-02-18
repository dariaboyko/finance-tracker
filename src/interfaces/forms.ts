import { Dayjs } from 'dayjs';

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignFormValues {
  username: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: Dayjs;
}

export interface LogInFormProps {
  onSignUpClick: () => void;
}

export interface SignUpFormProps {
  onSwitchToLogin: () => void;
}
