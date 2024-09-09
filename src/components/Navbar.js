import { Layout, Menu, Avatar, Button } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import './Navbar.css';

const { Header } = Layout;

function Navbar() {
  return (
    <Header className="app-header">
      <Button className="menu-button" icon={<MenuOutlined />} />
      <div className="logo">Tshirt</div>
      <Menu theme="dark" mode="horizontal" className="menu">
        <Menu.Item key="profile">
          <Avatar icon={<UserOutlined />} />
        </Menu.Item>
        <Menu.Item key="cart">
          <ShoppingCartOutlined style={{ fontSize: '24px' }} />
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
