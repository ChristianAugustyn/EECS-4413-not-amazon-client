import React from "react";
import "./Cart.css";
import { connect } from "react-redux";
import { increment, decrement, addToCart } from "../../state/actions";

const Cart = ({ count, cart, addToCart }) => {

  console.log(cart)

  return (
    <div className="cart">
      <h2>Welcome to the Cart page</h2>
      {!!cart && cart.length === 0
        ? "There are no items in your cart"
        : `there are ${cart.length} item in your cart`}
    </div>
  );
};

const mapStateToProps = (state) => {
  //takes the values from the cart
  return {
    count: state.count,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
