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

// Cart items state
export const cartState = atom({
  key: 'cartState',
  default: [
    {
      id: 1,
      name: 'T-Shirt',
      price: 19.99,
      quantity: 2,
      image: '/images/tshirt.jpg',
    },
    {
      id: 2,
      name: 'Hat',
      price: 9.99,
      quantity: 1,
      image: '/images/hat.jpg',
    },
  ],
});

// Selector to calculate the total number of items in the cart
export const cartItemCount = selector({
  key: 'cartItemCount',
  get: ({ get }) => {
    const cart = get(cartState);
    // Total item count (including quantities)
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

// Selector to calculate the total price of the cart
export const cartTotalPriceState = selector({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const cart = get(cartState);
    // Calculate total price by summing item price * quantity
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
});

// Atom to manage user role state
export const userRoleState = atom({
  key: 'userRoleState',
  default: null, // Default value, null means no role assigned
});
