import React, { useState } from 'react';
import { Badge } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { cartItemCount, sessionState } from '../atoms/state'; // Import Recoil state
import { CustomDrawer } from '../components';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/Navbar.css';

const MobileNavbar = () => {
  const session = useRecoilValue(sessionState); // Get session state from Recoil
  const itemCount = useRecoilValue(cartItemCount); // Get cart item count from Recoil state
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  // Show and close drawer handlers
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const goToProfile = () => {
    closeDrawer();
    navigate('/profile');
  };

  const goToCart = () => {
    closeDrawer();
    navigate('/cart');
  };

  return (
    <div className="navbar-mobile">
      {/* Mobile Menu Icon */}
      <div className="mobilenav-content">
        <MenuOutlined className="menu-icon" onClick={showDrawer} />

        {/* Centered Title */}
        <div
          className="mobilenav-center"
          onClick={() => {
            navigate('/');
          }}
        >
          <span className="mobilenav-title">T-Shirt</span>
        </div>

        {/* Right Side Icons */}
        <div className="mobilenav-right">
          {session ? (
            <UserOutlined className="mobilenav-icon" onClick={goToProfile} />
          ) : null}
          <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
            <ShoppingCartOutlined
              className="mobilenav-icon"
              onClick={goToCart}
            />
          </Badge>
        </div>
      </div>

      <CustomDrawer visible={drawerVisible} onClose={closeDrawer} />
    </div>
  );
};

export default MobileNavbar;
