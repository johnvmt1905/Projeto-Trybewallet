import { SET_EMAIL_VALUE } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL_VALUE:
    return { ...state, email: action.value };
  default:
    return state;
  }
}

export default user;
