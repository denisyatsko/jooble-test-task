import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import medicinesReducer from './medicinesReducer';
import authReducer from './authReducer';
import formReducer from './formReducer';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    collection: medicinesReducer,
    form: formReducer
});

export default rootReducer;
