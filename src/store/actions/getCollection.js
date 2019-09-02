import {getFirestore} from "redux-firestore";

export const getCollection =  (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore
            .collection('medicines_denis')
            .get()
            .then((data) => {
                // const data = querySnapshot.docs.map(doc => doc.data());

                data.forEach((doc) => {
                    console.log(doc.data());
                });
                // console.log('get collection');
                dispatch({type: 'GET_COLLECTION', data})
            }).catch(e => {
            dispatch({type: 'GET_COLLECTION_ERROR', e})
        });
    }
};