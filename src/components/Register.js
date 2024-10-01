import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { supaClient } from '../supabaseClient'; // Import your Supabase client
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
  const [form] = Form.useForm();
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const onFinish = async (values) => {
    const { email } = values;

    // Send magic link to the user's email
    const { error } = await supaClient.auth.signInWithOtp({ email });

    if (error) {
      setError(error.message);
      setSuccess(null);
    } else {
      setSuccess('A magic link has been sent to your email address.');
      setError(null);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ email: '' }}
        className="register-form"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid email address!',
            },
            {
              required: true,
              message: 'Please input your email address!',
            },
          ]}
          className="register-form-item"
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: 'black',
              borderColor: 'black',
              fontWeight: 'bold',
            }}
          >
            Send Magic Link
          </Button>
        </Form.Item>
      </Form>

      {error && <Alert message={error} type="error" showIcon />}
      {success && <Alert message={success} type="success" showIcon />}
    </div>
  );
};

export default Register;
