const initState = {
  count: 0,
  total: 0,
  login: [{ email: '', password: '' }],
  cart: [
    {
      bid: '1',
      title: 'World of Wonders',
      price: 10.0,
      category: 'Comedy',
      quantity: 2,
      image: 'http://covers.openlibrary.org/b/isbn/9780385533225-S.jpg',
      totalCost: 0
    },
    {
      bid: '2',
      title: 'Babies in disguise',
      price: 10.0,
      category: 'Comedy',
      quantity: 1,
      image: 'http://covers.openlibrary.org/b/isbn/9780385533225-S.jpg',
      totalCost: 0
    }

    // {
    //   bid: '3',
    //   title: 'Revenge of the Sith',
    //   price: '10.00',
    //   category: 'Comedy',
    //   itemsNumber: 1
    // },
    // {
    //   bid: '4',
    //   title: 'Step-Brothers',
    //   price: '10.00',
    //   category: 'Comedy',
    //   itemsNumber: 1
    // }
  ]
};

const reducer = (state = initState, action) => {
  const { type, value } = action;
  //console.log(type);
  switch (type) {
    case 'INC':
      return {
        ...state,
        count: state.count + value
      };
    case 'DEC':
      return {
        ...state,
        count: state.count - value
      };
    case 'QUANTITY_ADD':
      //console.log('im reducing bitches');
      let addedItem = state.cart.find((item) => item.bid === value);
      console.log(addedItem);
      addedItem.quantity += 1;

      return {
        ...state,
        cart: [...state.cart],
        total: state.total + addedItem.price
      };

    case 'QUANTITY_SUB':
      //console.log('im reducing bitches');
      let subbedItem = state.cart.find((item) => item.bid === value);
      if (subbedItem.quantity >= 1) {
        console.log(subbedItem);
        subbedItem.quantity -= 1;
      } else if (subbedItem.quantity === 0) {
      }
      return {
        ...state,
        cart: [...state.cart],
        total: state.total - subbedItem.price
      };

    case 'LOGIN':
      return {
        ...state,
        login: [value] //still need to add value properly
      };
    case 'ADD_ITEM':
      return {
        ...state,
        cart: [...state.cart, value]
      };

    default:
      return state;
  }
};

export default reducer;
