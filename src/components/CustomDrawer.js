import React, { useEffect, useState } from 'react';
import { Button, Drawer, Row, Col, Typography, Spin } from 'antd';
import {
  CloseOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { sessionState } from '../atoms/state';
import { useNavigate } from 'react-router-dom';
import { supaClient } from '../supabaseClient';
import '../styles/CustomDrawer.css';

const { Title } = Typography;

const CustomDrawer = ({ visible, onClose }) => {
  const session = useRecoilValue(sessionState);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [role, setRole] = useState(''); // Added state for user role
  const [loading, setLoading] = useState(true);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    await supaClient.auth.signOut();
    navigate('/');
    onClose();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session) {
        const { id } = session.user;
        const { data } = await supaClient
          .from('user_profiles')
          .select('*')
          .eq('user_id', id)
          .single();

        setFirstName(data?.first_name || '');
        setRole(data?.role || ''); // Fetch the role
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
      bodyStyle={{ padding: 0 }}
    >
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
        {!session ? (
          <Col span={24} className="center-content">
            <Button
              type="default"
              onClick={() => handleNavigate('/register')}
              className="drawer-button"
            >
              Join
            </Button>
          </Col>
        ) : (
          <Col className="drawer-button">
            <Row className="drawer-row">
              <Button
                type="default"
                block
                onClick={() => handleNavigate('/profile')}
                className="drawer-button"
              >
                Profile
              </Button>
            </Row>
            <Row className="drawer-row">
              <Button
                type="default"
                block
                onClick={() => handleNavigate('/product')}
                className="drawer-button"
              >
                Products
              </Button>
            </Row>
            <Row className="drawer-row">
              <Button
                type="default"
                block
                onClick={() => handleNavigate('/cart')}
                className="drawer-button"
              >
                Cart
              </Button>
            </Row>
            <Row className="drawer-row">
              <Button
                type="default"
                block
                onClick={() => handleNavigate('/admin')}
                className="drawer-button"
                style={{ display: role === 'admin' ? 'block' : 'none' }} // Admin button
              >
                Admin
              </Button>
            </Row>
            <Row className="drawer-row">
              <Button
                type="default"
                block
                danger
                onClick={handleSignOut}
                className="drawer-button"
              >
                Sign Out
              </Button>
            </Row>
          </Col>
        )}
      </Row>
    </Drawer>
  );
};

export default CustomDrawer;
