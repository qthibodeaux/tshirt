import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/state';
import { Radio, Select, Button, InputNumber, notification } from 'antd'; // Import Ant Design components
import '../styles/Product.css';

const { Option } = Select;

const Product = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedDesign, setSelectedDesign] = useState(0); // For toggling designs
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSizeType, setSelectedSizeType] = useState(''); // Track whether adult or child is selected
  const [selectedSize, setSelectedSize] = useState(''); // Track selected size
  const [quantity, setQuantity] = useState(1); // Track quantity

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

  const sizes = ['XXL', 'XL', 'L', 'M', 'S']; // Common sizes for both adult and child

  const openNotification = (productName, sizeType, size, quantity) => {
    notification.success({
      message: 'Added to Cart',
      description: `${productName} (${sizeType} - ${size}) with quantity ${quantity} added to cart!`,
      duration: 3, // Notification duration (in seconds)
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

    // Show notification
    openNotification(product.name, selectedSizeType, selectedSize, quantity);
  };

  return (
    <div className="product-container">
      {/* Toggle between designs */}
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

      {/* Display selected design */}
      <div className="product-image-container">
        <img
          src={products[selectedDesign].image}
          alt={products[selectedDesign].name}
          className="product-image"
        />
        <div className="product-label">{products[selectedDesign].name}</div>
      </div>

      {/* Color Selector */}
      <div className="product-color-selector">
        <label htmlFor="color-select">Select Color:</label>
        <Select
          id="color-select"
          value={selectedColor}
          onChange={(value) => setSelectedColor(value)}
          placeholder="Choose Color"
        >
          {products[selectedDesign].availableColors.map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </Select>
      </div>

      {/* Adult or Child Size Type Selector */}
      <div className="size-type-selector">
        <label>Choose Type:</label>
        <Radio.Group
          onChange={(e) => {
            setSelectedSizeType(e.target.value);
            setSelectedSize(''); // Reset size when switching type
          }}
          value={selectedSizeType}
        >
          <Radio value="adult">Adult</Radio>
          <Radio value="child">Child</Radio>
        </Radio.Group>
      </div>

      {/* Size Selector */}
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

      {/* Quantity Selector */}
      <div className="product-quantity-selector">
        <label>Quantity:</label>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value)}
        />
      </div>

      {/* Add to Cart Button */}
      <Button
        type="primary"
        className="add-to-cart-button"
        onClick={() => addToCart(products[selectedDesign])}
        disabled={!selectedSizeType || !selectedSize || quantity < 1} // Disable if no type, size, or invalid quantity
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default Product;
