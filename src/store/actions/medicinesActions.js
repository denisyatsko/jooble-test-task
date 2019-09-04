const collection = 'medicines_denis';

export const getCollection = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection(collection).get().then((doc) => {
      if (doc) {
        let data = [];

        doc.forEach((doc) => {
          data.push(doc.data())
        });

        dispatch({type: 'GET_COLLECTION', data})
      }
    });
  }
};

export const addMedicine = (medicine) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection(collection).add({
      ...medicine
    }).then(() => {
      dispatch({type: 'ADD_MEDICINE', medicine})
    }).catch((err) => {
      dispatch({type: 'ADD_MEDICINE_ERROR', err})
    })
  }
};

export const deleteMedicine = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    // firestore.collection(collection).doc().delete().then((data) => {
    //   console.log(data);
    //   dispatch({type: 'DELETE_MEDICINE', id})
    // });

    firestore.collection(collection).doc('medicine').delete();

    firestore.collection(collection).get().then((doc) => {
      if (doc) {
        doc.forEach((doc) => {
          // console.log(doc.data(id).delete())
        });

        // dispatch({type: 'GET_COLLECTION', data})
      }
    });
  }
};
