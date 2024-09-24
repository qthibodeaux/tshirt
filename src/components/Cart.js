import React, { useState } from 'react';
import {
  List,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Input,
} from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, cartTotalPriceState } from '../atoms/state';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const { Title, Text } = Typography;
const { Option } = Select;

const CartPage = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState); // Use Recoil state for cart
  const totalPrice = useRecoilValue(cartTotalPriceState); // Total price from Recoil state
  const [customQty, setCustomQty] = useState({}); // Store custom quantity for 10+
  const navigate = useNavigate();

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id)); // Remove the item
  };

  // Handle quantity change for items
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(id); // If 0 is selected, remove the item
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Handle 10+ custom quantity change
  const handleCustomQuantityChange = (id, value) => {
    setCustomQty((prev) => ({ ...prev, [id]: value }));
  };

  // Update custom quantity
  const handleCustomQuantityUpdate = (id) => {
    const customQuantity = customQty[id];
    if (customQuantity > 0) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: customQuantity } : item
        )
      );
    }
    setCustomQty((prev) => ({ ...prev, [id]: null })); // Reset customQty input field
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    navigate('/checkout');
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
              <Col span={12}>
                <Text strong>{item.name}</Text>
                <div>
                  <Text>Qty: </Text>
                  {customQty[item.id] === undefined ? (
                    <Select
                      value={item.quantity}
                      onChange={(value) =>
                        value === 'custom'
                          ? setCustomQty({
                              ...customQty,
                              [item.id]: item.quantity,
                            })
                          : handleQuantityChange(item.id, value)
                      }
                      style={{ width: 80 }}
                    >
                      <Option value={0}>0 (Delete)</Option>
                      {[...Array(9).keys()].map((num) => (
                        <Option key={num + 1} value={num + 1}>
                          {num + 1}
                        </Option>
                      ))}
                      <Option value="custom">10+</Option>
                    </Select>
                  ) : (
                    <>
                      <Input
                        type="number"
                        min={10}
                        value={customQty[item.id]}
                        onChange={(e) =>
                          handleCustomQuantityChange(
                            item.id,
                            parseInt(e.target.value, 10)
                          )
                        }
                        style={{ width: 60 }}
                      />
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleCustomQuantityUpdate(item.id)}
                      >
                        Update
                      </Button>
                    </>
                  )}
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
