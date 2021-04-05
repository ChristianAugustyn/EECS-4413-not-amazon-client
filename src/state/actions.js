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

const setLoginSuccess = (isLoginSuccess) => {
  return {
    type: 'LOGIN_SUCCESS',
    value: isLoginSuccess
  };
};
const setLoginError = (setLoginError) => {
  return {
    type: 'LOGIN_ERROR',
    value: setLoginError
  };
};

const setLoginPending = (isLoginPending) => {
  return {
    type: 'LOGIN_PENDING',
    value: isLoginPending
  };
};

const login = (email, password) => {
  return (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    sendLoginRequest(email, password)
      .then((success) => {
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(true));
      })

      .catch((err) => {
        dispatch(setLoginPending(false));
        dispatch(setLoginError(err));
      });
  };
};

const sendLoginRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email === 'user@example.com' && password === 'password') {
      return resolve(true);
    } else {
      return reject(new Error('Invalid email or password'));
    }
  });
};

export {
  increment,
  decrement,
  addToCart,
  quantityAdd,
  quantitySub,
  setLoginSuccess,
  setLoginError,
  setLoginPending,
  login
};
