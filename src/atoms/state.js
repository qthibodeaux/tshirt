// state.js
import { atom, selector } from 'recoil';

// Atom to manage user session state
export const sessionState = atom({
  key: 'sessionState',
  default: null, // Default value, null means no user logged in
});

// Atom to manage user profile state
export const profileState = atom({
  key: 'profileState',
  default: null, // Default value, null means no profile loaded
});

export const cartState = atom({
  key: 'cartState',
  default: [], // Default to an empty array, representing an empty cart
});

export const cartItemCount = selector({
  key: 'cartItemCount',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.length;
  },
});
