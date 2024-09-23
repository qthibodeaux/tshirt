// loader.js
import { redirect } from 'react-router-dom';
import { supaClient } from './supabaseClient'; // Adjust the path as needed

export const adminLoader = async ({ request }) => {
  const session = supaClient.auth.session(); // Get the session, adjust this as needed
  if (!session) {
    return redirect('/'); // Redirect to home if not authenticated
  }

  const { user_id } = session.user;
  const { data, error } = await supaClient
    .from('user_profiles')
    .select('role') // Assuming your user_profiles table has a role field
    .eq('user_id', user_id)
    .single();

  if (error || data.role !== 'admin') {
    return redirect('/'); // Redirect to home if not an admin
  }

  return null; // Return null if the user is an admin
};
