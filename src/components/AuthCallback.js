import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supaClient } from '../supabaseClient';
import { useSetRecoilState } from 'recoil';
import { sessionState, profileState } from '../atoms/state';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useSetRecoilState(sessionState);
  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    // Extract the parameters from the URL
    const params = new URLSearchParams(location.hash.substring(1)); // For hash-based routing
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    // If the tokens exist, set the session
    if (accessToken) {
      supaClient.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(({ data, error }) => {
          if (error) {
            console.error('Error setting session:', error);
          } else {
            console.log('Session set successfully:', data.session);
            setSession(data.session);
            navigate('/welcome'); // Navigate to the welcome page
          }
        });
    } else {
      console.error('No access token found in the URL');
      navigate('/'); // Redirect to home or another route if tokens are not found
    }
  }, [location, navigate, setSession, setProfile]);

  return <div>Processing authentication...</div>; // Add a loader or similar feedback to the user
}

export default AuthCallback;
