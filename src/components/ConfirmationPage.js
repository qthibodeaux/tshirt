import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Confirmation = () => {
  const location = useLocation();
  const {
    productName,
    selectedColor,
    selectedSizeType,
    selectedSize,
    quantity,
  } = location.state || {};
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={2}>Item Added to Cart</Title>
      <Paragraph>
        {productName} ({selectedSizeType} - {selectedSize}, {selectedColor}) has
        been added to your cart with a quantity of {quantity}.
      </Paragraph>
      <Button type="primary" onClick={() => navigate('/cart')}>
        Go to Cart
      </Button>
      <Button
        style={{ marginLeft: '10px' }}
        onClick={() => navigate('/product')}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default Confirmation;
