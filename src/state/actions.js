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

export { increment, decrement, addToCart, quantityAdd, quantitySub };
