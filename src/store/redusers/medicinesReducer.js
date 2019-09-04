const medicinesReducer = (state = [], action) => {
  const {data, id} = action;
  // console.log(action)

  switch (action.type) {
    case 'GET_COLLECTION':
      console.log('GET_COLLECTION');
      return data;
    case 'ADD_MEDICINE':
      console.log('ADD_MEDICINE');
      return [...state, data];
    case 'DELETE_MEDICINE':
      console.log('DELETE_MEDICINE');

      return state.filter(element => element.id !== id);
    default:
      return state;
  }

};

export default medicinesReducer;
