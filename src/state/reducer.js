const initState = {
    count: 0,
    cart: [

    ]
}

const reducer = (state = initState, action) => {
    const { type, value } = action

    switch (type) {
        case 'INC':
            return {
                ...state, 
                count: state.count + value
            }
        case 'DEC':
            return {
                ...state, 
                count: state.count - value
            }
        case 'ADD_ITEM':
            return {
                ...state,
                cart: [...state.cart, value]
            }
        default:
            return state
    }
}

export default reducer