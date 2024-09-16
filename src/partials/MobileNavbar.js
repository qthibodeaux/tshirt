// MobileNavbar.js
import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { sessionState } from '../atoms/state'; // Import Recoil state
import '../styles/Navbar.css';

const MobileNavbar = () => {
  const session = useRecoilValue(sessionState);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <div className="navbar-mobile">
      {/* Mobile Menu Icon */}
      <MenuOutlined className="menu-icon" onClick={showDrawer} />

      {/* Centered Title */}
      <div className="navbar-center">
        <span className="navbar-title">T Shirt</span>
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
