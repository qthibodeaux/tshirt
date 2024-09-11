// useSession.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { supaClient } from './supabaseClient';
import { sessionState, profileState } from './state'; // Import Recoil atoms

export function useSession() {
  const setSession = useSetRecoilState(sessionState);
  const setProfile = useSetRecoilState(profileState);
  const [channel, setChannel] = useState(null);
  const navigate = useNavigate();

  // Effect to initialize session and set up auth state change listener
  useEffect(() => {
    supaClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session); // Set the session in Recoil state
      // Listen for auth state changes
      supaClient.auth.onAuthStateChange((_event, session) => {
        setSession(session); // Update Recoil session state
        setProfile(null); // Reset profile when session changes
      });
    });
  }, [setSession, setProfile]);

  // Effect to handle profile listening based on session state
  useEffect(() => {
    if (session?.user && !profile) {
      listenToUserProfileChanges(session.user.id).then((newChannel) => {
        if (newChannel) {
          if (channel) {
            channel.unsubscribe();
          }
          setChannel(newChannel);
        }
      });
    } else if (!session?.user) {
      if (channel) {
        channel.unsubscribe();
      }
      setChannel(null);
      setProfile(null);
    }
  }, [session, profile, setProfile, channel]);

  // Function to listen to user profile changes
  async function listenToUserProfileChanges(userId) {
    const { data } = await supaClient
      .from('user_profiles')
      .select('*')
      .filter('user_id', 'eq', userId);

    if (!data?.length) {
      navigate('/welcome');
    } else {
      setProfile(data[0]); // Set the profile in Recoil state
    }

    return supaClient
      .channel(`public:user_profiles`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setProfile(payload.new); // Update Recoil profile state on changes
        }
      )
      .subscribe();
  }

  // Authentication Actions
  const handleLogin = async (credentials) => {
    const { data, error } = await supaClient.auth.signInWithPassword(
      credentials
    );
    if (error) {
      console.error('Login failed:', error);
      return;
    }
    setSession(data.session); // Update session state
  };

  const handleLogout = async () => {
    const { error } = await supaClient.auth.signOut();
    if (error) {
      console.error('Logout failed:', error);
      return;
    }
    setSession(null); // Clear session state
    setProfile(null); // Clear profile state
  };

  // Return both Recoil values and auth functions
  return {
    session: useRecoilValue(sessionState),
    profile: useRecoilValue(profileState),
    handleLogin,
    handleLogout,
  };
}
