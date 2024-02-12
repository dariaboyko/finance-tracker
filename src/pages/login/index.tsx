import { MailTwoTone, LockTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
const Login = () => {
  return (
    <div>
      Login
      <Input placeholder="Email" type="email" prefix={<MailTwoTone />} />
      <Input placeholder="Password" type="password" prefix={<LockTwoTone />} />
    </div>
  );
};

export default Login;
