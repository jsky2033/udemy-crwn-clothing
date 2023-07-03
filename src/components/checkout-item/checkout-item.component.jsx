import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { updateCartItems } = useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={item.imageUrl} alt={item.name}></img>
      </div>
      <span className="name">{item.name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => updateCartItems(item, "removeOne")}
        >
          &#10094;
        </div>
        <span className="value">{item.quantity}</span>
        <div className="arrow" onClick={() => updateCartItems(item)}>
          &#10095;
        </div>
      </span>
      <span className="price">${item.price * item.quantity}</span>
      <div
        className="remove-button"
        onClick={() => updateCartItems(item, "removeAll")}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
