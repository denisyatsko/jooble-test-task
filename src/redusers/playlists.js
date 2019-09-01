const initialState = [
    'initialValPlaylist'
];

export default function playlists(state = initialState, action) {
    if (action.type === 'TEST_DISPATCH') {
        return [
            ...state,
            action.payload
        ]
    } else if (action.type === 'DELETE_DISPATCH') {
        return state;
    }
    return state;
}