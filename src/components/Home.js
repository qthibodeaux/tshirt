import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col, Image, Divider, List } from 'antd';
import {
  FileImageOutlined,
  CheckCircleOutlined,
  TruckFilled,
  MinusCircleFilled,
  SmileFilled,
} from '@ant-design/icons';
import { supaClient } from '../supabaseClient';

import stock1 from '../assets/stock1.png';
import stock2 from '../assets/stock2.png';
import banner from '../assets/banner2.jpg';

const { Text, Title } = Typography;

function Home() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  // Check for session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supaClient.auth.getSession();
      setSession(data.session);
    };
    checkSession();
  }, []);

  return (
    <div>
      <Banner navigate={navigate} />
      <FeaturesSection />

      {/* Second Section */}
      <div style={{ backgroundColor: 'black', padding: '20px' }}>
        <Title level={3} style={{ textAlign: 'center', color: 'white' }}>
          Two Amazing Designs
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col span={12}>
            <Image
              src={stock1}
              alt="Design 1"
              preview={false}
              style={{ borderRadius: '8px', width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <Image
              src={stock2}
              alt="Design 2"
              preview={false}
              style={{ borderRadius: '8px', width: '100%' }}
            />
          </Col>
        </Row>
      </div>

      {/* Third Section */}
      <div style={{ padding: '20px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          We offer both Adult and Child sizes!
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {['XXLarge', 'XLarge', 'Large', 'Medium', 'Small'].map((item) => (
            <Col
              key={item}
              span={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              <CheckCircleOutlined
                style={{
                  color: 'black',
                  marginRight: '10px',
                  fontSize: '24px',
                }}
              />
              {item}
            </Col>
          ))}
        </Row>
      </div>

      {/* Fourth Section */}
      <div style={{ padding: '20px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Colors Available
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'red',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'blue',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'green',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'yellow',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'orange',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'purple',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'white',
                height: '50px',
                borderRadius: '5px',
                border: '1px solid black',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'cyan',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: 'black',
                height: '50px',
                borderRadius: '5px',
              }}
            ></div>
          </Col>
        </Row>
      </div>

      <FootSection />
    </div>
  );
}

const Banner = ({ navigate }) => (
  <div style={{ position: 'relative', overflow: 'hidden' }}>
    <Image
      src={banner}
      alt="Hero Banner"
      preview={false}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
      }}
    />
    {/* Overlay with transparent black layer */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      {/* Welcome header */}
      <Title level={2} style={{ color: 'white', fontSize: '48px', margin: 0 }}>
        Welcome
      </Title>
      <Title level={3} style={{ color: 'white', fontSize: '36px', margin: 0 }}>
        Custom Shirt and Design
      </Title>
      <Divider
        style={{ borderColor: 'white', width: '80%', marginTop: '20px' }}
      />

      {/* Button */}
      <Button
        type="primary"
        style={{
          backgroundColor: 'transparent',
          borderColor: 'white',
          color: 'white',
          marginTop: '20px',
          padding: '10px 30px',
          fontSize: '18px',
        }}
        icon={<FileImageOutlined />}
        onClick={() => navigate('/product')}
        size="large"
      >
        Shirts
      </Button>
    </div>
  </div>
);

// Footer Section with contact details
const FootSection = () => (
  <div style={{ padding: '20px' }}>
    <Row justify="center" style={{ textAlign: 'center' }}>
      <Title level={4} style={{ fontWeight: 'bold', fontSize: '24px' }}>
        NEED HELP?
      </Title>
    </Row>
    <Divider />
    <Row justify="center" style={{ textAlign: 'center', marginBottom: '10px' }}>
      <Col style={{ textAlign: 'center' }}>
        <Row justify="center">
          <span style={{ fontSize: '36px', marginRight: '10px' }}>📞</span>
        </Row>
        <Row justify="center">
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
            888-888-8888
          </span>
        </Row>
      </Col>
    </Row>
    <Row justify="center" style={{ textAlign: 'center', marginBottom: '10px' }}>
      <Title level={5} style={{ fontWeight: 'bold', fontSize: '20px' }}>
        Phone Hours
      </Title>
    </Row>
    <Row justify="center" style={{ textAlign: 'center', marginBottom: '10px' }}>
      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
        Monday - Friday 8am - 8pm CST
      </span>
    </Row>
    <Divider />
    <Row justify="center" style={{ textAlign: 'center', marginBottom: '10px' }}>
      <Col style={{ textAlign: 'center' }}>
        <Row justify="center">
          <span style={{ fontSize: '36px', marginRight: '10px' }}>✉️</span>
        </Row>
        <Row justify="center">
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
            admintshirts@gmail.com
          </span>
        </Row>
      </Col>
    </Row>
  </div>
);

const FeaturesSection = () => {
  return (
    <div style={{ padding: '1.5rem' }}>
      {/* First Section: Free Shipping */}
      <Row align="middle">
        <Col span={8} style={{ textAlign: 'center' }}>
          <TruckFilled style={{ fontSize: '3.25rem', color: 'black' }} />
        </Col>
        <Col span={16}>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: '1.25rem' }}>
                Free Shipping
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>Orders over $100</Col>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Second Section: No Minimums */}
      <Row align="middle">
        <Col span={8} style={{ textAlign: 'center' }}>
          <MinusCircleFilled style={{ fontSize: '3.25rem', color: 'black' }} />
        </Col>
        <Col span={16}>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: '1.25rem' }}>
                No Minimums
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>No Order Is Too Small</Col>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Third Section: Quality Guaranteed */}
      <Row align="middle">
        <Col span={8} style={{ textAlign: 'center' }}>
          <SmileFilled style={{ fontSize: '3.25rem', color: 'black' }} />
        </Col>
        <Col span={16}>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: '1.25rem' }}>
                Quality Guaranteed
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>100% Satisfaction</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
