import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { supaClient } from './supabaseClient';
import { sessionState, profileState } from './atoms/state'; // Import Recoil atoms

export function useSession() {
  const setSession = useSetRecoilState(sessionState);
  const setProfile = useSetRecoilState(profileState);
  const [channel, setChannel] = useState(null);
  const navigate = useNavigate();

  // Effect to initialize session and set up auth state change listener
  useEffect(() => {
    async function fetchSession() {
      try {
        const {
          data: { session },
          error,
        } = await supaClient.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
          return;
        }
        if (session) {
          console.log('Session found:', session);
          setSession(session); // Set the session in Recoil state
        } else {
          console.log('No session found');
        }

        // Listen for auth state changes
        const { data: listener } = supaClient.auth.onAuthStateChange(
          (_event, session) => {
            console.log('Auth state changed:', session);
            setSession(session); // Update Recoil session state
            setProfile(null); // Reset profile when session changes
          }
        );

        // Clean up listener on unmount
        return () => {
          listener?.unsubscribe();
        };
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    }

    fetchSession();
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
    try {
      const { data, error } = await supaClient
        .from('user_profiles')
        .select('*')
        .filter('user_id', 'eq', userId);

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      if (!data?.length) {
        console.log('No profile found, redirecting to welcome page.');
        navigate('/welcome');
      } else {
        console.log('Profile found:', data[0]);
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
            console.log('Profile updated:', payload.new);
            setProfile(payload.new); // Update Recoil profile state on changes
          }
        )
        .subscribe();
    } catch (error) {
      console.error('Failed to listen to profile changes:', error);
    }
  }

  // Authentication Actions
  const handleLogin = async (credentials) => {
    try {
      const { data, error } = await supaClient.auth.signInWithPassword(
        credentials
      );
      if (error) {
        console.error('Login failed:', error);
        return;
      }
      console.log('Login successful:', data);
      setSession(data.session); // Update session state
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supaClient.auth.signOut();
      if (error) {
        console.error('Logout failed:', error);
        return;
      }
      console.log('Logout successful');
      setSession(null); // Clear session state
      setProfile(null); // Clear profile state
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Return both Recoil values and auth functions
  return {
    session: useRecoilValue(sessionState),
    profile: useRecoilValue(profileState),
    handleLogin,
    handleLogout,
  };
}
