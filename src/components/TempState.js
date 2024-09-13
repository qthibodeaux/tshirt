import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  sessionState,
  profileState,
  cartState,
  cartItemCount,
  userRoleState,
} from '../atoms/state'; // Import Recoil atoms

function TempState() {
  const session = useRecoilValue(sessionState);
  const profile = useRecoilValue(profileState);
  const cart = useRecoilValue(cartState);
  const itemCount = useRecoilValue(cartItemCount);
  const userRole = useRecoilValue(userRoleState);

  /*
  console.log('Session in TempState:', session); // Debugging log
  console.log('Profile in TempState:', profile);
  console.log('Cart in TempState:', cart);
  console.log('Item count in TempState:', itemCount);
  console.log('User role in TempState:', userRole);
*/
  return (
    <div>
      <p>Session: {JSON.stringify(session)}</p>
      <p>Profile: {JSON.stringify(profile)}</p>
      <p>Cart: {JSON.stringify(cart)}</p>
      <p>Item Count: {itemCount}</p>
      <p>User Role: {JSON.stringify(userRole)}</p>
    </div>
  );
}

export default TempState;
