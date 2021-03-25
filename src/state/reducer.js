const initState = {
    count: 0
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
        default:
            return state
    }
}

export default reducer