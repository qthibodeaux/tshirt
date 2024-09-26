import React, { useState } from 'react';
import { Button, Col, Avatar, Row, Radio, Typography, InputNumber } from 'antd';
import {
  SkinOutlined,
  BgColorsOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/state';
import '../styles/Product.css';

import kstate from '../assets/kstate.jpg';
import kansas from '../assets/kansas.jpg';

const { Title } = Typography;

const ProductMobile = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSizeType, setSelectedSizeType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'T-Shirt Design 1',
      image: kansas,
      availableColors: ['Red', 'Blue', 'Green'],
    },
    {
      id: 2,
      name: 'T-Shirt Design 2',
      image: kstate,
      availableColors: ['Black', 'White', 'Gray'],
    },
  ];

  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
  ];

  const adultChildOptions = [
    { label: 'Adult', value: 'adult' },
    { label: 'Child', value: 'child' },
  ];

  const sizeOptions = [
    { label: 'XXL', value: 'XXL' },
    { label: 'XL', value: 'XL' },
    { label: 'L', value: 'L' },
    { label: 'M', value: 'M' },
    { label: 'S', value: 'S' },
  ];

  const getPrice = () => {
    if (selectedSizeType === 'adult') {
      return 20;
    }
    if (selectedSizeType === 'child') {
      return 15;
    }
    return 0;
  };

  const addToCart = (product) => {
    const item = {
      product_name: product.name, // Capture product name directly
      selectedColor,
      selectedSizeType,
      selectedSize,
      quantity,
      price: getPrice() * quantity, // Include price in cart item
    };
    setCart([...cart, item]);
    navigate('/cart-summary'); // Navigate to the summary page after adding to cart
  };

  const handleQuantityChange = (value) => {
    setQuantity(value > 0 ? value : 1);
  };

  const resetQuantity = () => setQuantity(1);

  const currentPrice = getPrice() * quantity;

  return (
    <div className="product-container">
      <div className="design-selection">
        <Title level={3} className="section-title">
          <SkinOutlined style={{ marginRight: 8 }} />
          Choose a Design:
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col span={12} className="center-content">
            <Avatar shape="square" size={64} src={kansas} alt="Kansas Design" />
            <Radio
              checked={selectedDesign === 0}
              onClick={() => setSelectedDesign(0)}
            >
              Kansas
            </Radio>
          </Col>
          <Col span={12} className="center-content">
            <Avatar
              shape="square"
              size={64}
              src={kstate}
              alt="Kansas State Design"
            />
            <Radio
              checked={selectedDesign === 1}
              onClick={() => setSelectedDesign(1)}
            >
              Kansas State
            </Radio>
          </Col>
        </Row>
      </div>

      <div>
        <Title level={3} className="section-title">
          <BgColorsOutlined style={{ marginRight: 8 }} />
          Choose a Color:
        </Title>
        <Row justify="center">
          <Radio.Group
            options={colorOptions}
            onChange={(e) => setSelectedColor(e.target.value)}
            value={selectedColor}
            optionType="button"
            buttonStyle="solid"
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        </Row>
      </div>

      <div>
        <Title level={3} className="section-title">
          Adult or Child sizes:
        </Title>
        <Row justify="center">
          <Radio.Group
            options={adultChildOptions}
            onChange={(e) => setSelectedSizeType(e.target.value)}
            value={selectedSizeType}
            optionType="button"
            buttonStyle="solid"
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        </Row>
      </div>

      <div>
        <Title level={3} className="section-title">
          Choose a size
        </Title>
        <Row justify="center">
          <Radio.Group
            options={sizeOptions}
            onChange={(e) => setSelectedSize(e.target.value)}
            value={selectedSize}
            optionType="button"
            buttonStyle="solid"
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        </Row>
      </div>

      <div>
        <Title level={3} className="section-title">
          Quantity
        </Title>
        <Row justify="center" align="middle">
          <Col>
            <Button
              icon={<MinusOutlined />}
              onClick={() => handleQuantityChange(quantity - 1)}
            />
          </Col>
          <Col>
            <InputNumber
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </Col>
          <Col>
            <Button
              icon={<PlusOutlined />}
              onClick={() => handleQuantityChange(quantity + 1)}
            />
          </Col>
          <Col>
            <Button onClick={resetQuantity}>Reset</Button>
          </Col>
        </Row>
      </div>

      {/* Display price row */}
      <div>
        <Title level={3} style={{ textAlign: 'center', marginTop: 20 }}>
          Current Price: ${currentPrice}
        </Title>
      </div>

      <Button
        type="primary"
        className="add-to-cart-button"
        onClick={() => addToCart(products[selectedDesign])}
        disabled={
          !selectedColor || !selectedSizeType || !selectedSize || quantity < 1
        }
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductMobile;
