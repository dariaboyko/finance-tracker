import './login.scss';
import { useState } from 'react';
import { LogInForm } from './logInForm';
import { SignUpForm } from './signUpForm';

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <section className="login--background">
      <div
        className={`login--wrapper ${showLoginForm ? 'login--wrapper__login' : 'login--wrapper__signup'}`}>
        <h1>{showLoginForm ? 'Login' : 'Sign Up'}</h1>
        {showLoginForm ? (
          <LogInForm onSignUpClick={handleToggleForm} />
        ) : (
          <SignUpForm onSwitchToLogin={handleToggleForm} />
        )}
      </div>
    </section>
  );
};

export default Login;
