import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import medicinesReducer from './medicinesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    collection: medicinesReducer,
});

export default rootReducer;
