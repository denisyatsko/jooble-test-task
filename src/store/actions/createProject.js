import {getFirebase} from "react-redux-firebase";
import {getFirestore} from "redux-firestore";

export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
           dispatch({ type: 'CREATE_PROJECT', project })
    }
};