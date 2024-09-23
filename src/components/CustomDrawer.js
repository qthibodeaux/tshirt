import React, { useEffect, useState } from 'react';
import { Button, Drawer, Row, Col, Typography, Spin } from 'antd';
import {
  CloseOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { sessionState } from '../atoms/state'; // Assuming sessionState is your session atom
import { useNavigate } from 'react-router-dom';
import { supaClient } from '../supabaseClient';
import '../styles/CustomDrawer.css';

const { Title } = Typography;

const CustomDrawer = ({ visible, onClose }) => {
  const session = useRecoilValue(sessionState); // Check session state
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // Close the drawer after navigation
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session) {
        const { id } = session.user; // Assuming user_id is in the session
        const { data, error } = await supaClient
          .from('user_profiles')
          .select('*') // Selecting the first_name field
          .eq('user_id', id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error.message);
        } else {
          // Use 'first_name' from the returned data
          console.log('Name?', data);
          setFirstName(data?.first_name || '');
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [session]);

  return (
    <Drawer
      title=""
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ padding: 0 }} // Customize body padding
    >
      {/* Header Row with X, Home, and Cog Icons */}
      <Row className="drawer-header" justify="space-between" align="middle">
        <Col>
          <Button
            type="text"
            icon={<CloseOutlined style={{ fontSize: '20px' }} />}
            onClick={onClose}
          />
        </Col>
        <Col>
          <Button
            type="text"
            icon={<HomeOutlined style={{ fontSize: '20px' }} />}
            onClick={() => handleNavigate('/')}
          />
        </Col>
        <Col>
          <Button
            type="text"
            icon={<SettingOutlined style={{ fontSize: '20px' }} />}
            onClick={() => console.log('settings')}
          />
        </Col>
      </Row>

      {/* Welcome message if user is logged in and has a first name */}
      {loading ? (
        <Row justify="center" align="middle">
          <Spin />
        </Row>
      ) : (
        session &&
        firstName && (
          <Row className="drawer-welcome" justify="center" align="middle">
            <Col>
              <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
                Welcome, {firstName}!
              </Title>
            </Col>
          </Row>
        )
      )}

      <Row className="drawer-content">
        {/* Check if the user is logged in or not */}
        {!session ? (
          // If no session, show "Join" button centered
          <Col span={24} className="center-content">
            <Button type="default" onClick={() => handleNavigate('/register')}>
              Join
            </Button>
          </Col>
        ) : (
          // If session exists, show profile, products, and cart buttons
          <Col>
            <Row className="drawer-row">
              <Button
                type="default"
                block
                onClick={() => handleNavigate('/profile')}
              >
                Profile
              </Button>
            </Row>
            <Row className="drawer-row">
              <Button
                type="default"
                block
                onClick={() => handleNavigate('/products')}
              >
                Products
              </Button>
            </Row>
            <Row className="drawer-row">
              <Button
                type="default"
                block
                onClick={() => handleNavigate('/cart')}
              >
                Cart
              </Button>
            </Row>
          </Col>
        )}
      </Row>
    </Drawer>
  );
};

export default CustomDrawer;
