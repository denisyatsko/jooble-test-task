const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            };
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                authError: null
            };
        default:
            return state;
    }
};

export default authReducer;
