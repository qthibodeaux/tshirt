import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, Divider, Row, Col } from 'antd';
import '../styles/OrderConfirmation.css';

const { Title, Text } = Typography;

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderNumber, orderItems, totalAmount } = location.state || {}; // Retrieve order details from state

  return (
    <div className="confirmation-container">
      <Title level={2} className="confirmation-title">
        Order Confirmation
      </Title>
      <Text className="confirmation-thank-you">Thank you for your order!</Text>
      <div className="order-number-section">
        <Text strong>Order Number: </Text>
        <Text className="order-number">{orderNumber}</Text>
      </div>
      <Divider />
      <Title level={3} className="order-summary-title">
        Order Summary
      </Title>
      {orderItems && orderItems.length > 0 ? (
        <List
          className="order-items-list"
          itemLayout="horizontal"
          dataSource={orderItems}
          renderItem={(item) => (
            <List.Item>
              <Row className="order-item-row" gutter={16}>
                <Col span={4}>
                  <img
                    className="order-item-image"
                    src={item.image}
                    alt={item.product_name}
                  />
                </Col>
                <Col span={16}>
                  <Text strong>{item.product_name}</Text>
                  <div>
                    <Text>Color: {item.selected_color}</Text>
                  </div>
                  <div>
                    <Text>Size: {item.selected_size}</Text>
                  </div>
                  <Text>Qty: {item.quantity}</Text>
                </Col>
                <Col span={4} className="order-item-price">
                  <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      ) : (
        <Text>No items found in the order.</Text>
      )}
      <Divider />
      <div className="order-total-section">
        <Text strong>Total Amount: </Text>
        <Text className="total-amount">
          ${totalAmount ? totalAmount.toFixed(2) : '0.00'}
        </Text>
      </div>
    </div>
  );
};

export default OrderConfirmation;
