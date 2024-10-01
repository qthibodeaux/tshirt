import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  message,
  Select,
} from 'antd';
import { supaClient } from '../supabaseClient';

const { Title } = Typography;
const { Option } = Select;

const stateOptions = [
  'Texas',
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const Welcome = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const {
        first_name,
        last_name,
        phone,
        email,
        street1,
        street2,
        city,
        state,
        zip,
      } = values;

      // Combine address fields into one
      const shipping_address = `${street1}, ${
        street2 ? street2 + ',' : ''
      } ${city}, ${state}, ${zip}`;

      // Get the current authenticated user
      const { data: session, error: sessionError } =
        await supaClient.auth.getSession();

      if (sessionError || !session) {
        throw new Error('User is not authenticated.');
      }

      const user_id = session.session.user.id;

      // Insert the user profile into Supabase
      const { data, error } = await supaClient.from('user_profiles').insert([
        {
          user_id,
          first_name,
          last_name,
          phone,
          email,
          shipping_address,
        },
      ]);

      if (error) throw error;

      message.success('Profile created successfully!');

      // Navigate to the profile page after success
      navigate('/profile');
    } catch (error) {
      console.error('Error creating profile: ', error.message);
      message.error('Failed to create profile. Please try again.');
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <Col xs={24} sm={16} md={12} lg={8}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Welcome! Complete your profile
        </Title>
        <Form
          form={form}
          name="welcome-form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number' },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please enter your email' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Street Address 1"
            name="street1"
            rules={[
              { required: true, message: 'Please enter your street address' },
            ]}
          >
            <Input placeholder="Enter street address 1" />
          </Form.Item>

          <Form.Item label="Street Address 2" name="street2">
            <Input placeholder="Enter street address 2 (optional)" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please enter your city' }]}
          >
            <Input placeholder="Enter your city" />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: 'Please select your state' }]}
          >
            <Select placeholder="Select your state">
              {stateOptions.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Zip Code"
            name="zip"
            rules={[{ required: true, message: 'Please enter your zip code' }]}
          >
            <Input placeholder="Enter your zip code" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Welcome;
