import React, { useState } from 'react';
import { Drawer, Button, Badge, Avatar, Typography, Row, Col } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
<<<<<<< Updated upstream
import { cartItemCount, sessionState } from '../atoms/state';
import { CustomDrawer } from '../components';
import '../styles/Navbar.css';
=======
import { cartItemCount, sessionState } from '../atoms/state'; // Import Recoil state
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/Navbar.css'; // Your custom styles

const { Text } = Typography;
>>>>>>> Stashed changes

const MobileNavbar = () => {
  const session = useRecoilValue(sessionState); // Get session state from Recoil
  const itemCount = useRecoilValue(cartItemCount); // Get cart item count from Recoil state
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  // Show and close drawer handlers
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  // Navigation handlers
  const goToHome = () => {
    closeDrawer();
    navigate('/home');
  };

  const goToProfile = () => {
    closeDrawer();
    navigate('/profile');
  };

  const goToJoin = () => {
    closeDrawer();
    navigate('/join');
  };

  const goToHome = () => navigate('');

  return (
    <div className="navbar-mobile">
      {/* Mobile Menu Icon */}
      <div className="mobilenav-content">
        <MenuOutlined className="menu-icon" onClick={showDrawer} />

        {/* Centered Title */}
<<<<<<< Updated upstream
        <div className="mobilenav-center" onClick={goToHome}>
          <span className="mobilenav-title">T Shirt</span>
=======
        <div className="mobilenav-center">
          <span className="mobilenav-title">T-Shirt</span>
>>>>>>> Stashed changes
        </div>

        {/* Right Side Icons */}
        <div className="mobilenav-right">
          <UserOutlined className="mobilenav-icon" />
          <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
            <ShoppingCartOutlined className="mobilenav-icon" />
          </Badge>
        </div>
      </div>

<<<<<<< Updated upstream
      <CustomDrawer visible={drawerVisible} onClose={closeDrawer} />
=======
      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        className="drawer-mobile"
      >
        {/* Home Button */}
        <Row justify="center" className="drawer-button-row">
          <Button
            type="primary"
            icon={<HomeOutlined />}
            size="large"
            onClick={goToHome}
            className="drawer-button"
          >
            Home
          </Button>
        </Row>

        {/* Contextual Section: Profile info or Join */}
        <Row className="drawer-button-row">
          {session ? (
            <div className="profile-info" style={{ textAlign: 'center' }}>
              <Avatar size={64} icon={<UserOutlined />} />
              <Text strong>{session.user.email}</Text>
              <Button
                type="primary"
                onClick={goToProfile}
                className="profile-button"
                style={{ marginTop: '10px' }}
              >
                View Profile
              </Button>
            </div>
          ) : (
            <Button type="primary" block onClick={goToJoin}>
              Join
            </Button>
          )}
        </Row>
      </Drawer>
>>>>>>> Stashed changes
    </div>
  );
};

export default MobileNavbar;
