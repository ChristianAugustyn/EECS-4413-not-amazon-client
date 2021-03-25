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

export {
    increment,
    decrement
}