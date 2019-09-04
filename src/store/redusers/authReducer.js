const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNIN_ERROR':
            console.log('error log in!');
            return {
                ...state,
                authError: 'Login failed'
            };
        case 'SIGNIN_SUCCESS':
            console.log('success log in!');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            console.log('success log OUT!');
            return state;
        default:
            return state;
    }
};

export default authReducer;