import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { SignFormValues, SignUpFormProps } from 'interfaces/forms';
import { useState } from 'react';
import { signup } from './authService';
import { SignUpRequest } from 'interfaces/login';
import dayjs, { Dayjs } from 'dayjs';
import { RuleObject } from 'antd/es/form';
import { useNavigate } from 'react-router-dom';

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToLogin }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: SignFormValues) => {
    setLoading(true);

    try {
      const signupData: SignUpRequest = {
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        dateOfBirth: values.dateOfBirth
      };

      await signup(signupData);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  const validateDateOfBirth = (_: RuleObject, value: Dayjs | null) => {
    if (value instanceof dayjs) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Field is required!'));
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Field is required!', validateTrigger: 'onSubmit' }]}>
        <Input placeholder="Username" />
      </Form.Item>

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
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Field is required!', validateTrigger: 'onSubmit' }]}>
        <Input placeholder="Phone" />
      </Form.Item>

      <Form.Item name="dateOfBirth" rules={[{ validator: validateDateOfBirth }]}>
        <DatePicker placeholder="Date of Birth" maxDate={dayjs()} />
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
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!', validateTrigger: 'onSubmit' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            }
          })
        ]}>
        <Input.Password
          placeholder="Confirm Password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="link" onClick={onSwitchToLogin}>
          Return to Sign In
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};
