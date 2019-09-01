import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'

import tracks from './tracks';
import playlists from './playlists';
import authReducer from './auth';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    auth: authReducer
});

export default rootReducer;