/* eslint-disable react/prop-types */
import { Form, Input, Button } from 'antd';
import { MailTwoTone, LockTwoTone, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { LogInFormProps, LoginFormValues } from 'interfaces/forms';
import { useState } from 'react';
import { login } from './authService';
import { useNavigate } from 'react-router-dom';

export const SignInForm: React.FC<LogInFormProps> = ({ onSignUpClick }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      login(values);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };
  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        email: ''
      }}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Field is required!', validateTrigger: 'onSubmit' },
          {
            type: 'email',
            message: 'Please enter a valid email address',
            validateTrigger: 'onSubmit'
          }
        ]}>
        <Input placeholder="Email" prefix={<MailTwoTone />} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Field is required!', validateTrigger: 'onSubmit' },
          {
            min: 8,
            message: 'Password must be at least 8 characters long',
            validateTrigger: 'onSubmit'
          }
        ]}>
        <Input.Password
          placeholder="Password"
          prefix={<LockTwoTone />}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="default" onClick={onSignUpClick}>
          Sign Up
        </Button>
        <Button type="primary" loading={loading} htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};
