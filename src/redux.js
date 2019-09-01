import thunk from 'redux-thunk';
import firebase, {config, firebaseConfig} from './firebase';
// import * as firebase from 'firebase';
import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {getFirestore, reduxFirestore} from 'redux-firestore';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import reducer from './redusers';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
//
const enhancer = composeEnhancers(
    reactReduxFirebase(firebase, config),
    reduxFirestore(firebase, config),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
);

export const store = createStore(reducer, enhancer);
