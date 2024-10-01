import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supaClient } from '../supabaseClient'; // Assuming Supabase client is configured properly

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supaClient.auth.getSession();

      if (error || !data.session) {
        console.log('Error or no session:', error);
        navigate('/product');
        return;
      }

      const session = data.session;
      const userProfile = await getUserProfile(session.user.id); // Fetch user profile from Supabase

      if (userProfile?.role !== 'admin') {
        console.log('User role:', userProfile);
        navigate('/product'); // Redirect to product page if not admin
      } else {
        setRole('admin');
      }

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Loader while checking role
  }

  return role === 'admin' ? children : null;
}

export default AdminRoute;

async function getUserProfile(userId) {
  const { data, error } = await supaClient
    .from('user_profiles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}
