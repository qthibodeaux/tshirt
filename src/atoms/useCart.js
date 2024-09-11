// useCart.js
import { useRecoilState } from 'recoil';
import { cartState } from './state';

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (item) => {
    setCart([...cart, item]); // Add item to the cart
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId)); // Remove item by ID
  };

  return { cart, addToCart, removeFromCart };
};
