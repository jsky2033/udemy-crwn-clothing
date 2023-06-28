import { createContext, useEffect, useState } from "react";

// the actual value to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}, // this is the function given to the rest of the app
  cartItems: [],
  addItemToCart: () => {}, // the fcn provided externally is the wrapper
  cartCount: 0, // this is set internally so no need for a fcn
});

// HELPERS
const getUpdatedCartList = (cartItems, productToAdd) => {
  // find if cartItems contains product to add
  var foundItem = cartItems.find(({ id }) => productToAdd.id === id);
  // If found, increment quantity and return
  if (!!foundItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // If not, return new array with modified cartItems/new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false); // set initial value here
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((currentTotal, cartItem) => {
      return currentTotal + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems, cartCount]);

  // context state change wrapper function
  const addItemToCart = (productToAdd) => {
    setCartItems(getUpdatedCartList(cartItems, productToAdd));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
