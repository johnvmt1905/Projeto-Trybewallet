export const SET_EMAIL_VALUE = 'SET_EMAIL_VALUE';
export const SET_EXPENCIES = 'SET_EXPENCIES';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const setEmailValue = (value) => ({
  type: SET_EMAIL_VALUE, value,
});

export const setExpencies = (payload) => ({
  type: SET_EXPENCIES, payload,
});

export const setCurrencies = (payload) => ({
  type: SET_CURRENCIES, payload,
});
