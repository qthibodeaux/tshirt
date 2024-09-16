import React from 'react';
import { List, Button, Row, Col, Typography, Divider } from 'antd';
import { useRecoilValue } from 'recoil';
import { cartState, cartTotalPriceState } from '../atoms/state'; // Assume these atoms store cart data
import '../styles/Cart.css';

const { Title, Text } = Typography;

const CartPage = () => {
  const cartItems = useRecoilValue(cartState); // List of items in the cart
  const totalPrice = useRecoilValue(cartTotalPriceState); // Total price from Recoil state

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    // Add checkout logic here
  };

  return (
    <div className="cart-page">
      <Title level={2}>Shopping Cart</Title>

      <List
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
              <Col span={16}>
                <Text strong>{item.name}</Text>
                <div>Quantity: {item.quantity}</div>
                <Text type="secondary">Price: ${item.price.toFixed(2)}</Text>
              </Col>
              <Col span={4} className="cart-item-price">
                <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />

      <Divider />

      <Row justify="end" className="cart-summary">
        <Col>
          <Title level={4}>Total: ${totalPrice.toFixed(2)}</Title>
        </Col>
      </Row>

      <Row justify="end" className="cart-checkout">
        <Button type="primary" size="large" onClick={handleCheckout}>
          Checkout
        </Button>
      </Row>
    </div>
  );
};

export default CartPage;
