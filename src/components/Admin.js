import React, { useEffect, useState } from 'react';
import { supaClient } from '../supabaseClient';
import { List, Typography } from 'antd';

const { Title } = Typography;

const AdminPage = () => {
  const [pendingEmails, setPendingEmails] = useState([]);
  const [allEmails, setAllEmails] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

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

  return (
    <div>
      <Title level={2}>Admin Page</Title>
      <div>
        <Title level={3}>Pending Emails</Title>
        <List
          bordered
          dataSource={pendingEmails}
          renderItem={(email) => <List.Item>{email}</List.Item>}
        />
      </div>
      <div>
        <Title level={3}>All Emails</Title>
        <List
          bordered
          dataSource={allEmails}
          renderItem={(email) => <List.Item>{email}</List.Item>}
        />
      </div>
      <div>
        <Title level={3}>Pending Orders</Title>
        <List
          bordered
          dataSource={pendingOrders}
          renderItem={(order) => (
            <List.Item>
              Order ID: {order.order_id} | Total: ${order.total_amount} | Date:{' '}
              {new Date(order.order_date).toLocaleString()}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AdminPage;
