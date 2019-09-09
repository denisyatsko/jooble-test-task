export const routes = {
  HOME: '/',
  ADD: '/add',
  EDIT: '/edit',
  SIGN_IN: '/signin',
};

export const validation = {
  code: {
    error: 'this value must be between 5 and 10 symbol',
    rule: {minLength: 5, maxLength: 10}
  },
  name: {
    error: 'this value must be between 5 and 100 symbol',
    rule: {minLength: 5, maxLength: 100}
  },
  price: {
    error: 'this value must be between 0.01 and 1 000 000',
    rule: 'checkInterval:["0.1", "1000000"]'
  },
  expirationDate: {
    error: 'this value must be between 1 and 1000',
    rule: 'checkInterval:["1", "1000"]'
  },
  textarea: {
    error: 'max length is 2000',
    rule: {minLength: 0, maxLength: 2000}
  }
};
