// Product.js
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/state';
import '../styles/Product.css'; // Assuming you have a separate CSS file

const Product = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedDesign, setSelectedDesign] = useState(0); // For toggling designs
  const [selectedColor, setSelectedColor] = useState('');

  // Store quantity for each size (both adult and child)
  const [adultQuantities, setAdultQuantities] = useState({
    XXXL: 0,
    XXL: 0,
    XL: 0,
    L: 0,
    M: 0,
    S: 0,
  });
  const [childQuantities, setChildQuantities] = useState({
    12: 0,
    10: 0,
    8: 0,
    6: 0,
    4: 0,
  });

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

  const adultSizes = ['XXXL', 'XXL', 'XL', 'L', 'M', 'S'];
  const childSizes = ['12', '10', '8', '6', '4'];

  const handleQuantityChange = (size, value, isAdult) => {
    if (isAdult) {
      setAdultQuantities({ ...adultQuantities, [size]: value });
    } else {
      setChildQuantities({ ...childQuantities, [size]: value });
    }
  };

  const addToCart = (product) => {
    const selectedSizes = {
      adult: adultQuantities,
      child: childQuantities,
    };

    const item = {
      ...product,
      selectedColor,
      selectedSizes,
    };

    setCart([...cart, item]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-container">
      {/* Toggle between designs */}
      <div className="design-toggle">
        <label htmlFor="design-select">Choose a Design:</label>
        <select
          id="design-select"
          value={selectedDesign}
          onChange={(e) => setSelectedDesign(Number(e.target.value))}
        >
          {products.map((product, index) => (
            <option key={product.id} value={index}>
              {product.name}
            </option>
          ))}
        </select>
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
        <select
          id="color-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">Choose Color</option>
          {products[selectedDesign].availableColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Size Selector */}
      <div className="product-size-selector">
        <div className="size-section">
          <div className="size-title">Adult Sizes</div>
          <div className="size-row">
            {adultSizes.map((size) => (
              <div key={size} className="size-option">
                <label>{size}</label>
                <input
                  type="number"
                  min="0"
                  value={adultQuantities[size]}
                  onChange={(e) =>
                    handleQuantityChange(size, e.target.value, true)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="size-section">
          <div className="size-title">Child Sizes</div>
          <div className="size-row">
            {childSizes.map((size) => (
              <div key={size} className="size-option">
                <label>{size}</label>
                <input
                  type="number"
                  min="0"
                  value={childQuantities[size]}
                  onChange={(e) =>
                    handleQuantityChange(size, e.target.value, false)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className="add-to-cart-button"
        onClick={() => addToCart(products[selectedDesign])}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
