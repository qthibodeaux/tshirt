import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  message,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { supaClient } from '../supabaseClient';
import { cartState, profileState } from '../atoms/state'; // Adjust path as necessary

const { Title } = Typography;

const Checkout = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cartItems = useRecoilValue(cartState);
  const [shippingAddress, setShippingAddress] = useState('');

  // Fetch user profile data
  const fetchProfile = async (userId) => {
    const { data, error } = await supaClient
      .from('user_profiles')
      .select('shipping_address')
      .eq('user_id', userId)
      .single(); // Assuming each user has one profile

    if (error) {
      console.error('Error fetching profile: ', error.message);
      return null;
    }
    return data;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: session } = await supaClient.auth.getSession();
      if (session?.user) {
        const userId = session.user.id;
        const profile = await fetchProfile(userId);
        if (profile) {
          setShippingAddress(profile.shipping_address || '');
        }
      }
    };
    fetchUserProfile();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Process the checkout (e.g., send to Supabase or another service)
      const totalAmount = calculateTotal();
      // Example: insert order into database
      const { data: session } = await supaClient.auth.getSession();
      const user_id = session.session.user.id;

      const { error } = await supaClient.from('orders').insert({
        user_id,
        total_amount: totalAmount,
        shipping_address: values.shipping_address || shippingAddress, // Use form input or profile address
        status: 'pending',
      });

      if (error) throw error;

      message.success('Order placed successfully!');
      form.resetFields(); // Reset the form after successful checkout
    } catch (error) {
      console.error('Checkout error: ', error.message);
      message.error('Failed to complete the order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Checkout</Title>

      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ shipping_address: shippingAddress }}
          >
            <Card title="Shipping Details">
              <Form.Item
                name="shipping_address"
                label="Shipping Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your shipping address',
                  },
                ]}
              >
                <Input placeholder="Enter shipping address" />
              </Form.Item>
            </Card>

            <Card title="Payment Details" style={{ marginTop: '20px' }}>
              <Form.Item
                name="card_number"
                label="Card Number"
                rules={[
                  { required: true, message: 'Please enter your card number' },
                ]}
              >
                <Input placeholder="Enter card number" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="expiry_date"
                    label="Expiry Date"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter card expiry date',
                      },
                    ]}
                  >
                    <Input placeholder="MM/YY" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cvc"
                    label="CVC"
                    rules={[
                      { required: true, message: 'Please enter card CVC' },
                    ]}
                  >
                    <Input placeholder="CVC" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="save_card" valuePropName="checked">
                <Checkbox>Save this card for future payments</Checkbox>
              </Form.Item>
            </Card>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ marginTop: '20px' }}
            >
              Place Order
            </Button>
          </Form>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Order Summary">
            {cartItems.map((item) => (
              <Row key={item.id}>
                <Col span={16}>
                  {item.name} (x{item.quantity})
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  ${item.price * item.quantity}
                </Col>
              </Row>
            ))}

            <Divider />

            <Row>
              <Col span={16}>
                <strong>Total:</strong>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <strong>${calculateTotal()}</strong>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
