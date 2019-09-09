export const changeStep = (step) => {
  return (dispatch) => {
    dispatch({type: 'CHANGE_STEP', step})
  }
};

export const setFormValue = (fields) => {
  return (dispatch) => {
    dispatch({type: 'SET_FORM_VALUE', fields})
  }
};

export const resetFormValue = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_FORM_VALUE'})
  }
};

export const canSubmit = (value) => {
  return (dispatch) => {
    dispatch({type: 'CAN_SUBMIT', value})
  }
};
