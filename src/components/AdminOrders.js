import React, { useState, useEffect } from 'react';
import { supaClient } from '../supabaseClient';
import { Typography, List, Switch, Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import '../styles/AdminOrders.css'; // Import the CSS file

const { Title } = Typography;

const AdminOrders = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data: orderData, error } = await supaClient
          .from('orders')
          .select(
            `
            order_id, order_number, total_amount, status, order_date,
            shipping_address, 
            user_profiles (first_name, last_name, phone, email),
            guest_email, 
            order_items (*)
          `
          )
          .eq('order_id', orderId)
          .single();

        if (error) throw error;

        setOrderDetails(orderData);
        setStatus(orderData.status);
      } catch (error) {
        console.error('Error fetching order details:', error.message);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsConfirmed(true);
  };

  const confirmStatusUpdate = async () => {
    try {
      const { error } = await supaClient
        .from('orders')
        .update({ status })
        .eq('order_id', orderId);

      if (error) throw error;

      notification.success({
        message: 'Order Updated',
        description: `Order status has been updated to "${status}".`,
      });
      setIsConfirmed(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update order status.',
      });
    }
  };

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="admin-orders-container">
      <Title level={2} className="title">
        Order Details
      </Title>
      <div className="order-info">
        <p>
          <strong>Order ID:</strong> {orderDetails.order_number}
        </p>
        <p>
          <strong>Name:</strong>{' '}
          {orderDetails.user_profiles
            ? `${orderDetails.user_profiles.first_name} ${orderDetails.user_profiles.last_name}`
            : 'Guest User'}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          {orderDetails.user_profiles
            ? orderDetails.user_profiles.email
            : orderDetails.guest_email}
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          {orderDetails.user_profiles
            ? orderDetails.user_profiles.phone
            : 'N/A'}
        </p>
        <p>
          <strong>Shipping Address:</strong> {orderDetails.shipping_address}
        </p>
        <p>
          <strong>Total Amount:</strong> ${orderDetails.total_amount}
        </p>

        <Title level={4} className="status-title">
          Order Status
        </Title>
        <div className="status-switches">
          <Switch
            checkedChildren="Pending"
            unCheckedChildren="Pending"
            checked={status === 'pending'}
            onChange={(checked) =>
              handleStatusChange(checked ? 'pending' : 'shipped')
            }
          />
          <Switch
            checkedChildren="Shipped"
            unCheckedChildren="Shipped"
            checked={status === 'shipped'}
            onChange={(checked) =>
              handleStatusChange(checked ? 'shipped' : 'delivered')
            }
          />
          <Switch
            checkedChildren="Delivered"
            unCheckedChildren="Delivered"
            checked={status === 'delivered'}
            onChange={(checked) =>
              handleStatusChange(checked ? 'delivered' : 'cancelled')
            }
          />
          <Switch
            checkedChildren="Cancelled"
            unCheckedChildren="Cancelled"
            checked={status === 'cancelled'}
            onChange={(checked) => handleStatusChange('cancelled')}
          />
        </div>

        {isConfirmed && (
          <Button
            type="primary"
            className="confirm-button"
            onClick={confirmStatusUpdate}
          >
            Confirm
          </Button>
        )}
      </div>

      <Title level={3} className="items-title">
        Order Items
      </Title>
      <List
        className="order-items-list"
        bordered
        dataSource={orderDetails.order_items}
        renderItem={(item) => (
          <List.Item className="order-item">
            {item.product_name} - {item.selected_color} - {item.selected_size} -{' '}
            {item.quantity} x ${item.price}
          </List.Item>
        )}
      />
    </div>
  );
};

export default AdminOrders;
