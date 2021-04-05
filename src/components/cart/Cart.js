import React from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import {
  increment,
  decrement,
  addToCart,
  quantityAdd,
  quantitySub
} from '../../state/actions';
import { Table, Button } from 'react-bootstrap';

const Cart = ({ count, cart, addToCart, quantityAdd, quantitySub, total }) => {

  const itemList = cart.map((item) => (
    <tr key={item.bid}>
      <td>
        <img alt="book" src={item.image}></img>
      </td>
      <td>{item.title}</td>
      <td>{item.category}</td>
      <td> ${(Math.round(item.price * 100) / 100).toFixed(2)}</td>
      <td>
        {item.quantity}{' '}
        <Button variant="light" onClick={() => quantityAdd(item.bid)}>
          +
        </Button>
        <Button variant="light" onClick={() => quantitySub(item.bid)}>
          -
        </Button>
      </td>
      <td>
        ${(Math.round(item.price * item.quantity * 100) / 100).toFixed(2)}
      </td>
    </tr>
  ));

  const totalCost = (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <b>Total</b>
      </td>
      <td>${(Math.round(total * 100) / 100).toFixed(2)}</td>
    </tr>
  );

  return (
    <div className="cart">
      <h2>Welcome to the Cart page</h2>
      {!!cart && cart.length === 0
        ? 'There are no items in your cart'
        : `there are ${cart.length} item in your cart`}
      <Table responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {itemList}
          {totalCost}
        </tbody>
      </Table>

      <Button>CheckOut</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  //takes the values from the cart
  return {
    count: state.count,
    cart: state.cart,
    total: state.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    addToCart: (item) => dispatch(addToCart(item)),
    quantityAdd: (id) => dispatch(quantityAdd(id)),
    quantitySub: (id) => dispatch(quantitySub(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
