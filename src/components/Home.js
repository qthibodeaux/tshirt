import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'; // Assuming you are using Ant Design
import { useRecoilValue } from 'recoil';
import { sessionState } from '../atoms/state'; // Import the session state from your Recoil atoms
import { supaClient } from '../supabaseClient';

function Home() {
  const navigate = useNavigate();
  //const session = useRecoilValue(sessionState); // Access the session state

  // Navigation handlers
  const goToProfile = () => navigate('/profile');
  const goToRegister = () => navigate('/register');
  const goToAdmin = () => navigate('/admin');

  // Handler to log the session
  const logSession = async () => {
    const { data } = await supaClient.auth.getSession();

    console.log('Current session:', data);
  };

  return (
    <div>
      <h1>Home</h1>
      <div>Hero</div>

      <div>
        <h2>Profile Banner</h2>
        <Button onClick={goToProfile} type="primary">
          View Profile
        </Button>
        <Button onClick={goToRegister} type="default">
          Register
        </Button>
        <Button onClick={goToAdmin} type="danger">
          Admin
        </Button>
        <Button onClick={logSession} type="default">
          Log Session
        </Button>
      </div>

      <div>Options</div>
      <div>About</div>
    </div>
  );
}

export default Home;
