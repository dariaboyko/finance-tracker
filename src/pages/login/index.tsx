import './login.scss';
import { useState } from 'react';
import { SignInForm } from './signInForm';
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
        <h1>{showLoginForm ? 'Sign In' : 'Sign Up'}</h1>
        {showLoginForm ? (
          <SignInForm onSignUpClick={handleToggleForm} />
        ) : (
          <SignUpForm onSwitchToLogin={handleToggleForm} />
        )}
      </div>
    </section>
  );
};

export default Login;
