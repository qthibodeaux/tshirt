import React, { useState } from 'react';
import {
  Button,
  Col,
  Image,
  Modal,
  Row,
  Radio,
  Typography,
  InputNumber,
} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
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
    { label: 'XXL', value: 'xxl' },
    { label: 'XL', value: 'xl' },
    { label: 'L', value: 'l' },
    { label: 'M', value: 'm' },
    { label: 'S', value: 's' },
  ];

  const addToCart = (product) => {
    const item = {
      ...product,
      selectedColor,
      selectedSizeType,
      selectedSize,
      quantity,
    };
    setCart([...cart, item]);
    showModal(product.name, selectedSizeType, selectedSize, quantity);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value > 0 ? value : 1);
  };

  const resetQuantity = () => setQuantity(1);

  const showModal = (productName, sizeType, size, quantity) => {
    setModalText(
      `${productName} (${sizeType} - ${size}) with quantity ${quantity} added to cart!`
    );
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
    }, 4000); // Modal will close after 4 seconds
  };

  return (
    <div className="product-container">
      <div className="design-selection">
        <Title level={2} style={{ textAlign: 'center' }}>
          Choose a Design:
        </Title>
        <Row justify="center">
          <Col span={12} className="center-content">
            <Title level={4}>Kansas</Title>
            <Image src={kansas} className="product-image" />
            <Radio
              checked={selectedDesign === 0}
              onClick={() => setSelectedDesign(0)}
            >
              Kansas
            </Radio>
          </Col>
          <Col span={12} className="center-content">
            <Title level={4}>Kansas State</Title>
            <Image src={kstate} className="product-image" />
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
        <Title level={2} style={{ textAlign: 'center', color: 'blue' }}>
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
        <Title level={2} style={{ textAlign: 'center' }}>
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
        <Title level={2} style={{ textAlign: 'center' }}>
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
        <Title level={2} style={{ textAlign: 'center' }}>
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

      <Modal
        title="Added to Cart"
        visible={modalVisible}
        footer={[
          <Button key="cart" type="primary" onClick={() => navigate('/cart')}>
            Go to Cart
          </Button>,
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
        onCancel={() => setModalVisible(false)}
        centered
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default ProductMobile;
