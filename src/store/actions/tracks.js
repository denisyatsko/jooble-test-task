const mocksAPI = [
    {
        id: 1,
        value: 'eeee'
    },
    {
        id: 2,
        value: 'fff'
    },
    {
        id: 3,
        value: 'den'
    },
    {
        id: 4,
        value: 'rturtu'
    }
];

export const asynGetTracks = () => dispatch => {
    setTimeout(() => {
        console.log('get tracks!!!');
        dispatch({ type: 'FETCH_SUCCESS', payload: mocksAPI })
    }, 2000)
};