import { atom } from 'recoil';

export const cartState = atom({
  key: 'cartState',
  default: [],
});

// Cart items state
export const cartItemsState = atom({
  key: 'cartItemsState',
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

// Total price selector
export const cartTotalPriceState = atom({
  key: 'cartTotalPriceState',
  default: 49.97, // For example purposes, you would compute this based on cart items
});
