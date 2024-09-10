import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/cart';
import { useSession } from '../useSession';
import { Layout, Button, Menu, Avatar } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

function Navbar() {
  const { session, profile } = useSession();
  const [cart, setCart] = useRecoilState(cartState);

  return (
    <Header className="app-header">
      <Button className="menu-button" icon={<MenuOutlined />} />
      <div className="logo">Tshirt</div>
      <Menu theme="dark" mode="horizontal" className="menu">
        <Menu.Item key="profile">
          <Avatar icon={<UserOutlined />} />
          {profile ? profile.username : 'Guest'}
        </Menu.Item>
        <Menu.Item key="cart">
          <ShoppingCartOutlined style={{ fontSize: '24px' }} />
          {cart.length}
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
