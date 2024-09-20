import React, { useState } from 'react';
import { Drawer, Button, Badge } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { cartItemCount, sessionState } from '../atoms/state'; // Import Recoil state
import '../styles/Navbar.css';

const MobileNavbar = () => {
  const session = useRecoilValue(sessionState);
  const itemCount = useRecoilValue(cartItemCount); // Get cart item count from Recoil state
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const goToCart = () => {
    // Implement your cart navigation logic here
    console.log('Navigating to cart');
  };

  return (
    <div className="navbar-mobile">
      {/* Mobile Menu Icon */}
      <div className="mobilenav-content">
        <MenuOutlined className="menu-icon" onClick={showDrawer} />

        {/* Centered Title */}
        <div className="mobilenav-center">
          <span className="mobilenav-title">T Shirt</span>
        </div>

        {/* Right Side Icons */}
        <div className="mobilenav-right">
          <UserOutlined className="mobilenav-icon" />
          <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
            <ShoppingCartOutlined
              className="mobilenav-icon"
              onClick={goToCart}
            />
          </Badge>
        </div>
      </div>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        {!session && (
          <Button type="primary" block>
            Join
          </Button>
        )}
      </Drawer>
    </div>
  );
};

export default MobileNavbar;
