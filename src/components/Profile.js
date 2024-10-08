import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message, List } from 'antd';
import { supaClient } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [profileData, setProfileData] = useState({});
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    fetchProfileData();
    fetchOrders();
  }, []);

  // Fetch user profile data from Supabase
  const fetchProfileData = async () => {
    try {
      const { data: session, error: sessionError } =
        await supaClient.auth.getSession();
      if (sessionError || !session) {
        throw new Error('User is not authenticated.');
      }

      const user_id = session.session.user.id;

      const { data, error } = await supaClient
        .from('user_profiles')
        .select('*')
        .eq('user_id', user_id)
        .single();

      if (error || !data) {
        // Redirect to welcome page if profile not found
        navigate('/welcome');
        return;
      }

      setProfileData(data);
      form.setFieldsValue(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data: ', error.message);
      message.error('Failed to load profile data.');
    }
  };

  // Fetch user orders from Supabase
  const fetchOrders = async () => {
    try {
      const { data: session } = await supaClient.auth.getSession();
      const user_id = session.session.user.id;

      const { data, error } = await supaClient
        .from('orders')
        .select('*')
        .eq('user_id', user_id);

      if (error) throw error;

      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders: ', error.message);
      message.error('Failed to load orders.');
    }
  };

  const onFinish = async (values) => {
    try {
      const { data: session } = await supaClient.auth.getSession();
      const user_id = session.session.user.id;

      const { error } = await supaClient
        .from('user_profiles')
        .update(values)
        .eq('user_id', user_id);

      if (error) throw error;

      message.success('Profile updated successfully!');
      setIsEditing(false);
      fetchProfileData();
    } catch (error) {
      console.error('Error updating profile: ', error.message);
      message.error('Failed to update profile.');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Disable editing mode
    form.setFieldsValue(profileData); // Reset form values to original profile data
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Profile</Title>
      {!loading && (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={profileData}
        >
          <Form.Item label="First Name" name="first_name">
            <Input placeholder="First Name" disabled={!isEditing} />
          </Form.Item>

          <Form.Item label="Last Name" name="last_name">
            <Input placeholder="Last Name" disabled={!isEditing} />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Phone" disabled={!isEditing} />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="Email" disabled={!isEditing} />
          </Form.Item>

          <Form.Item label="Shipping Address" name="shipping_address">
            <Input placeholder="Shipping Address" disabled={!isEditing} />
          </Form.Item>

          {!isEditing ? (
            <Button type="primary" onClick={handleEditClick}>
              Edit
            </Button>
          ) : (
            <>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </>
          )}
        </Form>
      )}

      <div style={{ marginTop: '40px' }}>
        <Title level={3}>Orders</Title>
        <List
          itemLayout="horizontal"
          dataSource={orders}
          renderItem={(order) => (
            <List.Item>
              <List.Item.Meta
                title={`Order #${order.order_id}`}
                description={`Status: ${order.status} | Total: $${order.total_amount}`}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Profile;
