import React, { useState } from 'react';
import { Radio, Select, Button, InputNumber, notification } from 'antd';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/state';
import '../styles/Product.css';

const { Option } = Select;

const ProductDesktop = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSizeType, setSelectedSizeType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: 'T-Shirt Design 1',
      image: '/images/design1.jpg',
      availableColors: ['Red', 'Blue', 'Green'],
    },
    {
      id: 2,
      name: 'T-Shirt Design 2',
      image: '/images/design2.jpg',
      availableColors: ['Black', 'White', 'Gray'],
    },
  ];

  const sizes = ['XXL', 'XL', 'L', 'M', 'S'];

  const openNotification = (productName, sizeType, size, quantity) => {
    notification.success({
      message: 'Added to Cart',
      description: `${productName} (${sizeType} - ${size}) with quantity ${quantity} added to cart!`,
      duration: 3,
    });
  };

  const addToCart = (product) => {
    const item = {
      ...product,
      selectedColor,
      selectedSizeType,
      selectedSize,
      quantity,
    };
    setCart([...cart, item]);
    openNotification(product.name, selectedSizeType, selectedSize, quantity);
  };

  return (
    <div className="product-container">
      <div className="design-selection">
        <label>Choose a Design:</label>
        <div className="design-grid">
          {products.map((product, index) => (
            <div key={product.id} className="design-option">
              <img
                src={product.image}
                alt={product.name}
                className="product-design-image"
              />
              <div>
                <Radio.Group
                  onChange={() => setSelectedDesign(index)}
                  value={selectedDesign}
                >
                  <Radio value={index}>{product.name}</Radio>
                </Radio.Group>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="product-image-container">
        <img
          src={products[selectedDesign].image}
          alt={products[selectedDesign].name}
          className="product-image"
        />
        <div className="product-label">{products[selectedDesign].name}</div>
      </div>

      <div className="product-color-selector">
        <label>Select Color:</label>
        <Select
          value={selectedColor}
          onChange={setSelectedColor}
          placeholder="Choose Color"
        >
          {products[selectedDesign].availableColors.map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </Select>
      </div>

      <div className="size-type-selector">
        <label>Choose Type:</label>
        <Radio.Group
          onChange={(e) => {
            setSelectedSizeType(e.target.value);
            setSelectedSize('');
          }}
          value={selectedSizeType}
        >
          <Radio value="adult">Adult</Radio>
          <Radio value="child">Child</Radio>
        </Radio.Group>
      </div>

      {selectedSizeType && (
        <div className="product-size-selector">
          <label>Choose Size:</label>
          <Radio.Group
            onChange={(e) => setSelectedSize(e.target.value)}
            value={selectedSize}
          >
            {sizes.map((size) => (
              <Radio key={size} value={size}>
                {size}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      )}

      <div className="product-quantity-selector">
        <label>Quantity:</label>
        <InputNumber min={1} value={quantity} onChange={setQuantity} />
      </div>

      <Button
        type="primary"
        className="add-to-cart-button"
        onClick={() => addToCart(products[selectedDesign])}
        disabled={!selectedSizeType || !selectedSize || quantity < 1}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesktop;
