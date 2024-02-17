import { MailTwoTone, LockTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import './login.scss';
import { useState } from 'react';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const enterLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  return (
    <section className="login--background">
      <div className="login--wrapper">
        <h1>Login</h1>
        <Input placeholder="Email" type="email" prefix={<MailTwoTone />} />
        <Input placeholder="Password" type="password" prefix={<LockTwoTone />} />
        <Button type="primary" loading={loading} onClick={() => enterLoading()}>
          Log In
        </Button>
      </div>
    </section>
  );
};

export default Login;
