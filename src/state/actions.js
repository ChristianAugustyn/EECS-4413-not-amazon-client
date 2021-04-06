import { reject } from 'lodash-es';

const increment = () => {
  return {
    type: 'INC',
    value: 1
  };
};

const decrement = () => {
  return {
    type: 'DEC',
    value: 1
  };
};

const addToCart = (item) => {
  return {
    type: 'ADD_ITEM',
    value: item
  };
};

const quantityAdd = (id) => {
  return {
    type: 'QUANTITY_ADD',
    value: id
  };
};

const quantitySub = (id) => {
  return {
    type: 'QUANTITY_SUB',
    value: id
  };
};

const login = (token) => {
  return {
    type: 'LOGIN',
    value: token,
    //not sure how to pass this
  };
};

const logout = () => {
  return {
    type: 'LOGOUT'
  }
}
export { increment, decrement, addToCart, quantityAdd, quantitySub, login, logout };
