const initState = {
    count: 0,
    total: 0,
    cart: [],
    user: {
      token: null
    }
};

const updateTotal = (state) => {
    let total = 0;
    state.cart.forEach((item) => {
      total += item.price * item.quantity
    });
    return total
};

const reducer = (state = initState, action) => {
    const { type, value } = action;
    //console.log(type);
    switch (type) {
        case "INC":
            return {
                ...state,
                count: state.count + value,
            };
        case "DEC":
            return {
                ...state,
                count: state.count - value,
            };
        case "QUANTITY_ADD":
            //console.log('im reducing bitches');
            let addedItem = state.cart.find((item) => item.bid === value);
            console.log(addedItem);
            addedItem.quantity += 1;
            
            return {
                ...state,
                cart: [...state.cart],
                total: updateTotal(state),
            };

        case "QUANTITY_SUB":
            //console.log('im reducing bitches');
            const sub_index = state.cart.findIndex((item) => item.bid === value);

            if (state.cart[sub_index].quantity === 1) { //if there is a quantity of 1 remaining remove it
              state.cart = state.cart.filter(item => item.bid !== value)
            } else { //subtract the value
              state.cart[sub_index].quantity = state.cart[sub_index].quantity - 1
            }

            return {
              ...state,
              total: updateTotal(state)
            }

        case "ADD_ITEM":
            const add_index = state.cart.findIndex((item) => item.bid === value.bid);
            if (add_index === -1) {
                //add to cart
                state.cart = [...state.cart, value]
            } else {
                //gett item by id and increment qty
                state.cart[add_index].quantity += value.quantity;
            }

            return {
              ...state,
              total: updateTotal(state)
          };
    case 'LOGIN': //adds the token into the state
      return {
        ...state,
        user: {
          token: value
        } //still need to add value properly
      };
    case 'LOGOUT': //removes the user token from the state
      return {
        ...state,
        user: { token: null }
      }
    default:
      return state;
  }
};

export default reducer;
