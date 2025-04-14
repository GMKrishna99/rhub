import React, {createContext, useState, useContext} from 'react';

// Create Context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };
  // Remove from Wishlist
  const removeFromWishlist = (productId) => {
  setWishlist((prevWishlist) => prevWishlist.filter(item => item.id !== productId));
};
// Remove from Cart
const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter(item => item.id !== productId));
};
  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, addToWishlist, removeFromWishlist, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Context
export const useCart = () => useContext(CartContext);
