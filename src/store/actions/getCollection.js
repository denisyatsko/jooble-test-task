import {getFirestore} from "redux-firestore";

export const getCollection = (project) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('medicines_denis').get().then((doc) => {
            if (doc) {
                let data = [];

                doc.forEach((doc) => {

                    data.push(doc.data())
                    // console.log(doc.data());
                });

                // const data = doc.data();
                dispatch({type: 'GET_COLLECTION', data})
            } else {
                console.log('does not exist')
            }
        });
        // firestore
        //     .collection('medicines_denis')
        //     .get()
        //     .then((data) => {
        //         // const data = querySnapshot.docs.map(doc => doc.data());
        //
        //
        //         dispatch({type: 'GET_COLLECTION', data})
        //     }).catch(e => {
        //     dispatch({type: 'GET_COLLECTION_ERROR', e})
        // });
    }
};