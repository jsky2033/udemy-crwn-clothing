import { createContext, useEffect, useState } from "react";

// the actual value to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}, // this is the function given to the rest of the app
  cartItems: [],
  updateCartItems: () => {}, // the fcn provided externally is the wrapper to setter
  cartCount: 0, // this is set internally so no need for a external setter fcn
  cartTotal: 0,
});

// HELPERS
const getUpdatedCartList = (cartItems, productToAdd, removeStatus) => {
  // remove item from cart
  if (removeStatus === "removeAll") {
    return cartItems.filter((cartItem) => cartItem.id !== productToAdd.id);
  }

  // find if cartItems contains product to update
  var foundItem = cartItems.find(({ id }) => productToAdd.id === id);
  // If found, change quantity and return
  if (!!foundItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            quantity:
              removeStatus === "removeOne" && cartItem.quantity === 0
                ? 0
                : removeStatus === "removeOne"
                ? cartItem.quantity - 1
                : cartItem.quantity + 1,
          }
        : cartItem
    );
  }
  // If item not found, return new array with modified cartItems/new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false); // set initial value here
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((currentTotal, cartItem) => {
      return currentTotal + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((currentTotal, item) => {
      return currentTotal + item.quantity * item.price;
    }, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // context state change wrapper function
  const updateCartItems = (productToAdd, removeStatus) => {
    setCartItems(getUpdatedCartList(cartItems, productToAdd, removeStatus));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    updateCartItems,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
