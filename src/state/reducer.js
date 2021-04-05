const initState = {
    count: 0,
    total: 0,
    cart: [],
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
            let subbedItem = state.cart.find((item) => item.bid === value);
            if (subbedItem.quantity >= 1) {
                console.log(subbedItem);
                subbedItem.quantity -= 1;
            } else if (subbedItem.quantity === 0) {
            }
            return {
                ...state,
                cart: [...state.cart],
                total: updateTotal(state),
            };

        case "ADD_ITEM":
            let index = state.cart.findIndex((item) => item.bid === value.bid);
            console.log(index);
            if (index === -1) {
                //add to cart
                state.cart = [...state.cart, value]
                return {
                    ...state,
                    total: updateTotal(state)
                };
            } else {
                //gett item by id and increment qty
                state.cart[index].quantity += value.quantity;
                return {
                    ...state,
                    total: updateTotal(state)
                };
            }
        default:
            return state;
    }
};

export default reducer;
