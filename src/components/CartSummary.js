import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
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
          <Row justify="center" className="item-details">
            <Col>
              <Row>
                <Text strong>New Item Added:</Text>
              </Row>
              <Row>
                <Text>Design:</Text> <Text>{lastAddedItem.name}</Text>
              </Row>
              <Row>
                <Text>Color:</Text> <Text>{lastAddedItem.selectedColor}</Text>
              </Row>
              <Row>
                <Text>Size Type:</Text>{' '}
                <Text>{lastAddedItem.selectedSizeType}</Text>
              </Row>
              <Row>
                <Text>Size:</Text> <Text>{lastAddedItem.selectedSize}</Text>
              </Row>
              <Row>
                <Text>Quantity:</Text> <Text>{lastAddedItem.quantity}</Text>
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
          onClick={() => navigate('/products')}
          className="product-button"
        >
          Back to Products
        </Button>
      </Row>
    </div>
  );
};

export default CartSummary;
