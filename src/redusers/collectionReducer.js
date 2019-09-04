const initialState = [
    {
        name: 'den'
    }
];

const collectionReducer = (state = initialState, action) => {
    const { data } = action;

    switch (action.type) {
        case 'GET_COLLECTION':
            // console.log('GET_COLLECTION');
            // console.log(data);
            return {
                ...state,
                data
            };
        default:
            return state;
    }
};

export default collectionReducer;