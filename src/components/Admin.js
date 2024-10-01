import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supaClient } from '../supabaseClient';
import { List, Typography } from 'antd';
import '../styles/Admin.css';

const { Title } = Typography;

const AdminPage = () => {
  const [pendingEmails, setPendingEmails] = useState([]);
  const [allEmails, setAllEmails] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders with pending status
        const { data: pendingOrdersData, error: ordersError } = await supaClient
          .from('orders')
          .select('*, user_profiles(email)')
          .eq('status', 'pending');

        if (ordersError) throw ordersError;

        // Extract pending emails and orders
        const emails = pendingOrdersData.map(
          (order) => order.user_profiles.email
        );
        setPendingEmails([...new Set(emails)].sort()); // Unique and sorted

        // Set pending orders
        setPendingOrders(pendingOrdersData);

        // Fetch all users
        const { data: allUsersData, error: usersError } = await supaClient
          .from('user_profiles')
          .select('email');

        if (usersError) throw usersError;

        // Extract all emails and set
        const allEmailsList = allUsersData.map((user) => user.email);
        setAllEmails([...new Set(allEmailsList)].sort()); // Unique and sorted
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleOrderClick = (order) => {
    navigate(`/admin/orders/${order.order_id}`, { state: { order } });
  };

  return (
    <div className="admin-container">
      <Title level={2} className="admin-title">
        Admin Page
      </Title>

      <div className="admin-section">
        <Title level={3} className="admin-section-title">
          Pending Emails
        </Title>
        <List
          bordered
          dataSource={pendingEmails}
          renderItem={(email) => <List.Item>{email}</List.Item>}
        />
      </div>

      <div className="admin-section">
        <Title level={3} className="admin-section-title">
          All Emails
        </Title>
        <List
          bordered
          dataSource={allEmails}
          renderItem={(email) => <List.Item>{email}</List.Item>}
        />
      </div>

      <div className="admin-section">
        <Title level={3} className="admin-section-title">
          Pending Orders
        </Title>
        <List
          bordered
          dataSource={pendingOrders}
          renderItem={(order) => (
            <List.Item onClick={() => handleOrderClick(order)}>
              <span className="admin-order-id">Order ID: {order.order_id}</span>
              <span className="admin-total">Total: ${order.total_amount}</span>
              <span>Date: {new Date(order.order_date).toLocaleString()}</span>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AdminPage;
