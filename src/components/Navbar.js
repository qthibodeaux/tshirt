import React, { useState } from 'react';
import { Menu, Dropdown, Badge, Button, Drawer } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { cartItemCount, sessionState } from '../atoms/state'; // Import Recoil states
import './Navbar.css';

const Navbar = () => {
  const session = useRecoilValue(sessionState);
  const itemCount = useRecoilValue(cartItemCount);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Define menu items for the account dropdown
  const accountMenu = (
    <Menu>
      {session ? (
        <Menu.Item key="manage-account">Manage Account</Menu.Item>
      ) : (
        <Menu.Item key="join">Join</Menu.Item>
      )}
    </Menu>
  );

  // Handle drawer visibility
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <nav className="navbar">
      {/* Mobile Menu Icon */}
      <div className="navbar-left">
        <MenuOutlined className="menu-icon" onClick={showDrawer} />
      </div>

      {/* Centered Title for Mobile */}
      <div className="navbar-center">
        <span className="navbar-title">T Shirt</span>
      </div>

      {/* Right Side Icons */}
      <div className="navbar-right">
        {/* Account Icon with Hover Dropdown */}
        <Dropdown
          overlay={accountMenu}
          trigger={['hover']}
          placement="bottomRight"
        >
          <UserOutlined className="navbar-icon" />
        </Dropdown>

        {/* Cart Icon with Badge */}
        <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
          <ShoppingCartOutlined className="navbar-icon" />
        </Badge>
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
    </nav>
  );
};

export default Navbar;
