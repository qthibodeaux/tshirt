import React from 'react';
import { Row, Col, Typography, Button, Avatar } from 'antd';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms/state';
import { useNavigate } from 'react-router-dom';
import '../styles/CartSummary.css';

const { Title, Text } = Typography;

const CartSummary = () => {
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();

  // Get the most recently added item in the cart
  const lastAddedItem = cart[cart.length - 1];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="cart-summary-container">
      <Title level={2} style={{ textAlign: 'center' }}>
        Cart Summary
      </Title>

      {/* Row 1: Display the details of the last added item */}
      {lastAddedItem && (
        <div className="cart-item">
          <Row justify="start" align="middle">
            <Col>
              {/* Avatar for the item */}
              <Avatar
                src={lastAddedItem.image} // Assuming the image URL is in `lastAddedItem.image`
                className="item-avatar"
                shape="square"
              />
            </Col>
            <Col flex="auto">
              <Row className="item-details">
                <Col span={12} className="item-label">
                  <Text>Design:</Text>
                </Col>
                <Col span={12} className="item-value">
                  <Text>{lastAddedItem.name}</Text>
                </Col>
              </Row>
              <Row className="item-details">
                <Col span={12} className="item-label">
                  <Text>Color:</Text>
                </Col>
                <Col span={12} className="item-value">
                  <Text>{lastAddedItem.selectedColor}</Text>
                </Col>
              </Row>
              <Row className="item-details">
                <Col span={12} className="item-label">
                  <Text>Size Type:</Text>
                </Col>
                <Col span={12} className="item-value">
                  <Text>{lastAddedItem.selectedSizeType}</Text>
                </Col>
              </Row>
              <Row className="item-details">
                <Col span={12} className="item-label">
                  <Text>Size:</Text>
                </Col>
                <Col span={12} className="item-value">
                  <Text>{lastAddedItem.selectedSize}</Text>
                </Col>
              </Row>
              <Row className="item-details">
                <Col span={12} className="item-label">
                  <Text>Quantity:</Text>
                </Col>
                <Col span={12} className="item-value">
                  <Text>{lastAddedItem.quantity}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}

      {/* Row 2: Total number of items and total price */}
      <Row
        justify="center"
        className="cart-summary-totals"
        style={{ marginTop: '20px' }}
      >
        <Col span={12}>
          <Text strong>Items In The Cart:</Text> <Text>{totalItems}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Cart Total:</Text> <Text>${totalPrice.toFixed(2)}</Text>
        </Col>
      </Row>

      {/* Buttons to go to Cart or return to Products */}
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Button
          type="primary"
          onClick={() => navigate('/cart')}
          className="cart-button"
        >
          Go to Cart
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={() => navigate('/product')}
          className="product-button"
        >
          Back to Products
        </Button>
      </Row>
    </div>
  );
};

export default CartSummary;
