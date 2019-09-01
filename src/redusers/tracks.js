const initialState = [
    // 'initialValTracks'
];

export default function tracks(state = initialState, action) {
    if (action.type === 'TEST_DISPATCH') {
        return [
            ...state,
            action.payload
        ]
    } else if (action.type === 'FETCH_SUCCESS') {
        return action.payload;
    }
    return state;
}