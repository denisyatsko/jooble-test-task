import {getFirebase} from "react-redux-firebase";
import {getFirestore} from "redux-firestore";

export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('medicines_denis').add()
            .then(() => {
                dispatch({type: 'CREATE_PROJECT', project})
            }).catch(e => {
            dispatch({type: 'CREATE_PROJECT_ERROR', e})
        });
    }
};