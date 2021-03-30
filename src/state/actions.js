const increment = () => {
    return {
        type: 'INC',
        value: 1
    }
}

const decrement = () => {
    return {
        type: 'DEC',
        value: 1
    }
}

const addToCart = item => {
    return {
        type: 'ADD_ITEM',
        value: item
    }
}

export {
    increment,
    decrement,
    addToCart
}