import { Menu, Dropdown, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { cartItemCount, sessionState } from '../atoms/state';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const DesktopNavbar = () => {
  const session = useRecoilValue(sessionState);
  const itemCount = useRecoilValue(cartItemCount);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const accountMenu = (
    <Menu>
      {session ? (
        <Menu.Item key="manage-account" onClick={goToProfile}>
          Manage Account
        </Menu.Item>
      ) : (
        <Menu.Item key="join">Join</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="navbar-desktop">
      <div className="desknav-contents">
        <div
          className="desknav-left"
          onClick={goToHome}
          style={{ cursor: 'pointer' }}
        >
          <span className="desknav-title">T Shirt</span>
        </div>

        {/* Right Side Icons */}
        <div className="desknav-right">
          <Dropdown
            overlay={accountMenu}
            trigger={['hover']}
            placement="bottomRight"
          >
            <UserOutlined className="desknav-icon" />
          </Dropdown>

          <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
            <ShoppingCartOutlined className="desknav-icon" onClick={goToCart} />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
