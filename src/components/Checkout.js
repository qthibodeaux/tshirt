import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { cartState, cartTotalPriceState, sessionState } from '../atoms/state';
import {
  List,
  Typography,
  Divider,
  Button,
  Input,
  Spin,
  Row,
  Col,
  notification,
} from 'antd';
import { supaClient } from '../supabaseClient';
import '../styles/CheckoutPage.css';

const { Text } = Typography;

const CheckoutPage = () => {
  const cartItems = useRecoilValue(cartState);
  const setCartItems = useSetRecoilState(cartState); // To update the cart
  const totalPrice = useRecoilValue(cartTotalPriceState);
  const session = useRecoilValue(sessionState);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [profile, setProfile] = useState(null); // State for profile info
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile from Supabase if session is active
  useEffect(() => {
    const fetchProfile = async () => {
      if (session) {
        try {
          const { data, error } = await supaClient
            .from('user_profiles')
            .select('first_name, last_name, phone, email, shipping_address')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else {
            setProfile(data);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleGuestCheckout = async () => {
    // Handle guest checkout process with Supabase insert logic
    await handleSubmitOrder(null); // For guest checkout, we pass null for user_id
  };

  const handleProfileEdit = () => {
    navigate('/profile');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmitOrder = async (userProfile) => {
    const shippingAddress = userProfile
      ? userProfile.shipping_address
      : `${guestInfo.address1}, ${guestInfo.address2}, ${guestInfo.city}, ${guestInfo.state}, ${guestInfo.zip}`;

    try {
      // 1. Insert the order
      const { data: order, error: orderError } = await supaClient
        .from('orders')
        .insert([
          {
            user_id: session ? session.user.id : null, // null for guest checkout
            total_amount: totalPrice,
            shipping_address: shippingAddress,
          },
        ])
        .select()
        .single();

      if (orderError) {
        throw new Error(orderError.message);
      }

      // 2. Insert the items directly with product details
      const orderItems = cartItems.map((item) => ({
        order_id: order.order_id, // UUID from the inserted order
        product_name: item.product_name, // Product name
        selected_color: item.selectedColor, // Selected color
        size_type: item.selectedSizeType, // 'adult' or 'child'
        selected_size: item.selectedSize, // Selected size
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supaClient
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw new Error(itemsError.message);
      }

      // 3. Clear the cart after the order is successfully placed
      setCartItems([]);

      // 4. Show success notification and navigate to confirmation page
      notification.success({
        message: 'Order Successful',
        description: 'Your order has been placed successfully!',
      });
      navigate('/order-confirmation');
    } catch (error) {
      notification.error({
        message: 'Order Failed',
        description: `Failed to place the order: ${error.message}`,
      });
    }
  };

  return (
    <div className="checkout-container">
      <List
        className="cart-items-list"
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <Row className="cart-item-row" gutter={16}>
              <Col span={4}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />
              </Col>
              <Col span={12}>
                <Text strong>{item.name}</Text>
                <div>
                  <Text>Qty: {item.quantity}</Text>
                </div>
                <Text type="secondary">Price: ${item.price.toFixed(2)}</Text>
              </Col>
              <Col span={8} className="cart-item-price">
                <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
                <Button
                  type="link"
                  danger
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />

      <Divider />

      {!session ? (
        <div className="guest-section">
          <Text strong>Total: ${totalPrice.toFixed(2)}</Text>
          <div className="button-row">
            <Button type="primary" onClick={handleGuestCheckout}>
              Checkout as Guest
            </Button>
            <Button onClick={handleRegisterClick}>Register</Button>
          </div>
          <Divider />
          {/* Guest form for entering details */}
          <div className="form-row">
            <Input
              className="form-item"
              placeholder="First Name"
              value={guestInfo.firstName}
              onChange={(e) =>
                setGuestInfo({ ...guestInfo, firstName: e.target.value })
              }
            />
          </div>
          <div className="form-row">
            <Input
              className="form-item"
              placeholder="Last Name"
              value={guestInfo.lastName}
              onChange={(e) =>
                setGuestInfo({ ...guestInfo, lastName: e.target.value })
              }
            />
          </div>
          {/* Other guest inputs for phone, email, address */}
          <Button type="primary" onClick={handleGuestCheckout}>
            Submit Order
          </Button>
        </div>
      ) : loading ? (
        <Spin />
      ) : (
        <div className="profile-section">
          {profile && (
            <>
              <div className="profile-info">
                <Text strong>Name: </Text>
                <Text>
                  {profile.first_name} {profile.last_name}
                </Text>
              </div>
              <div className="profile-info">
                <Text strong>Email: </Text>
                <Text>{profile.email}</Text>
              </div>
              <div className="profile-info">
                <Text strong>Phone: </Text>
                <Text>{profile.phone}</Text>
              </div>
              <div className="profile-info">
                <Text strong>Address: </Text>
                <Text>{profile.shipping_address}</Text>
              </div>
              <Divider />
              <Text strong>Total: ${totalPrice.toFixed(2)}</Text>
              <div className="button-row">
                <Button type="primary" onClick={handleProfileEdit}>
                  Edit Profile
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleSubmitOrder(profile)}
                >
                  Submit Order
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
