import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col, Image, Card } from 'antd'; // Updated imports for layout and Card
import {
  FileImageOutlined,
  TagsOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'; // Importing icons
import { supaClient } from '../supabaseClient';

import stock1 from '../assets/stock1.png';
import stock2 from '../assets/stock2.png';

const { Title } = Typography;

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
    <div style={{ padding: '20px' }}>
      <Header />
      {!session && <JoinUsButton />}

      <Banner navigate={navigate} />

      <div style={{ marginTop: '20px' }}>
        <CardSection title="Two Designs Available" icon={<FileImageOutlined />}>
          <Row gutter={[16, 16]}>
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
        </CardSection>

        <CardSection title="Sizes Available" icon={<TagsOutlined />}>
          <p>We offer both Adult and Child sizes!</p>
        </CardSection>

        <CardSection title="Available Sizes" icon={<CheckCircleOutlined />}>
          <p>Sizes range from Small all the way to XXL!</p>
        </CardSection>

        <CardSection title="Available Colors" icon={<CheckCircleOutlined />}>
          <p>We have a variety of colors to choose from!</p>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <div
                style={{
                  backgroundColor: 'red',
                  height: '50px',
                  borderRadius: '5px',
                }}
              ></div>
            </Col>
            <Col span={6}>
              <div
                style={{
                  backgroundColor: 'blue',
                  height: '50px',
                  borderRadius: '5px',
                }}
              ></div>
            </Col>
            <Col span={6}>
              <div
                style={{
                  backgroundColor: 'green',
                  height: '50px',
                  borderRadius: '5px',
                }}
              ></div>
            </Col>
            <Col span={6}>
              <div
                style={{
                  backgroundColor: 'yellow',
                  height: '50px',
                  borderRadius: '5px',
                }}
              ></div>
            </Col>
          </Row>
        </CardSection>
      </div>
    </div>
  );
}

const Header = () => (
  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
    <Title level={2}>JB T Shirt and Design</Title>
  </div>
);

const JoinUsButton = () => {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div
      style={{
        backgroundColor: 'lightblue',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      <Button type="primary" onClick={handleJoinUsClick}>
        Join Us
      </Button>
    </div>
  );
};

// New Banner component
const Banner = ({ navigate }) => (
  <div
    style={{
      backgroundColor: '#e0f7fa', // Light cyan background for the banner
      padding: '10px',
      textAlign: 'center',
      marginBottom: '20px',
      borderRadius: '8px',
    }}
  >
    <Button type="primary" onClick={() => navigate('/product')}>
      Go to Product Page
    </Button>
  </div>
);

// CardSection component for displaying each section in a card
const CardSection = ({ title, icon, children }) => (
  <Card
    style={{
      marginBottom: '20px',
      backgroundColor: '#e6f7ff', // Light blue background
      borderRadius: '8px',
    }}
    title={
      <div style={{ textAlign: 'center', margin: 0 }}>
        {icon} <strong>{title}</strong>
      </div>
    }
  >
    {children}
  </Card>
);

export default Home;
