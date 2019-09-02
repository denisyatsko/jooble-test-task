const initialState = {
};

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COLLECTION':
            console.log('GET_COLLECTION');
            // return {
            //     ...state,
            //     // authError: 'Login failed'
            // };
            return state;
        default:
            return state;
    }
};

export default collectionReducer;