import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supaClient } from './supabaseClient';

export function useSession() {
  const [userInfo, setUserInfo] = useState({
    profile: null,
    session: null,
  });
  const [channel, setChannel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supaClient.auth.getSession().then(({ data: { session } }) => {
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, session }));
      supaClient.auth.onAuthStateChange((_event, session) => {
        setUserInfo({ session, profile: null });
      });
    });
  }, []);

  useEffect(() => {
    if (userInfo.session?.user && !userInfo.profile) {
      listenToUserProfileChanges(userInfo.session.user.id).then(
        (newChannel) => {
          if (newChannel) {
            if (channel) {
              channel.unsubscribe();
            }
            setChannel(newChannel);
          }
        }
      );
    } else if (!userInfo.session?.user) {
      if (channel) {
        channel.unsubscribe();
      }
      setChannel(null);
    }
  }, [userInfo.session]);

  async function listenToUserProfileChanges(userId) {
    const { data } = await supaClient
      .from('user_profiles')
      .select('*')
      .filter('user_id', 'eq', userId);

    if (!data?.length) {
      navigate('/welcome');
    } else {
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, profile: data[0] }));
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
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            profile: payload.new,
          }));
        }
      )
      .subscribe();
  }

  return userInfo;
}
