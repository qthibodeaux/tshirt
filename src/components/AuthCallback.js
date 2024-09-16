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
    const handleAuthCallback = async () => {
      // Extract the parameters from the URL
      const params = new URLSearchParams(location.hash.substring(1)); // For hash-based routing
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        try {
          const { data, error } = await supaClient.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Error setting session:', error.message);
            // Provide user feedback
            alert('Authentication failed. Please try again.');
            navigate('/');
          } else {
            console.log('Session set successfully:', data.session);
            setSession(data.session);
            navigate('/welcome'); // Navigate to the welcome page
          }
        } catch (error) {
          console.error('Unexpected error:', error.message);
          alert('An unexpected error occurred. Please try again.');
          navigate('/');
        }
      } else {
        console.error('No access token found in the URL');
        alert('Invalid authentication link. Please try again.');
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [location, navigate, setSession, setProfile]);

  return <div>Processing authentication...</div>; // Add a loader or similar feedback to the user
}

export default AuthCallback;
