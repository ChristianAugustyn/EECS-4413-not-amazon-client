const KEY = 'user-session'

const loadState = () => {
    try {
        const serializedState = localStorage.getItem(KEY)
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(KEY, serializedState)
    } catch (err) {
        //ignore
    }
}

export {
    loadState,
    saveState
}
