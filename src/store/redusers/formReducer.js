const initialState = {
  step: 1,
  fields: {},
  canSubmit: '',
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_STEP':
      return {
        ...state,
        step: action.step
      };
    case 'SET_FORM_VALUE':
      console.log('CHANGE_FORM');
      return {
        ...state,
        fields: {...state.fields, ...action.fields}
      };
    case 'RESET_FORM_VALUE':
      console.log('RESET_FORM_VALUE');
      return {
        ...state,
        fields: {}
      };
    case 'CAN_SUBMIT':
      console.log('CAN_SUBMIT');
      return {
        ...state,
        canSubmit: action.value
      };
    default:
      return state;
  }
};

export default formReducer;
