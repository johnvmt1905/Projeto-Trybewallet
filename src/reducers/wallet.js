import { SET_CURRENCIES, SET_EXPENCIES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case SET_EXPENCIES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
}

export default wallet;
