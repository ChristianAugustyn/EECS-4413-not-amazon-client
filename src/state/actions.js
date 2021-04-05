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

const login = (email, password) => {
  return {
    type: 'LOGIN',
    value: email,
    pass: password
    //not sure how to pass this
  };
};
export { increment, decrement, addToCart, quantityAdd, quantitySub, login };
