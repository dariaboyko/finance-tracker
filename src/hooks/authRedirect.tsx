import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/tokenService';

interface AuthRedirectProps {
  children: React.ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthRedirect;
