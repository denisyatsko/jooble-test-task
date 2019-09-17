const medicinesReducer = (state = [], action) => {
  const {data, id} = action;

  switch (action.type) {
    case 'GET_COLLECTION':
      return data;
    case 'ADD_MEDICINE':
      return [...state, data];
    case 'EDIT_MEDICINE':
      return data;
    case 'UPDATE_MEDICINE':
      return [...state].map(x => x.id === data.id ? data : x);
    case 'DELETE_MEDICINE':
      return state.filter(element => element.id !== id);
    default:
      return state;
  }
};

export default medicinesReducer;
