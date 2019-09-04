const medicinesReducer = (state = [], action) => {
  const {data, id} = action;

  switch (action.type) {
    case 'GET_COLLECTION':
      console.log(data);
      return {
        ...state,
        data
      };
    case 'ADD_MEDICINE':
      console.log('ADD_MEDICINE');
      return {
        ...state,
        data
      };
    case 'DELETE_MEDICINE':
      console.log('DELETE_MEDICINE');

      return state;

      // console.log(state.data.filter((element) => element.name !== id));

      // return {
      //   ...state,
      //   ...state.data.filter((element) => element.name !== id)
      // };
    return state.data.filter((element) => element.name !== id);

    default:
      return state;
  }

};

export default medicinesReducer;
