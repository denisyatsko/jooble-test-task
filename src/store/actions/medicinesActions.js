const collection = 'medicines_denis';

export const getCollection = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection(collection).get().then((doc) => {
      let data = [];

      doc.forEach((doc) => {
        let info = doc.data();
        let id = {id: doc.id};
        let item = {...id, ...info};

        data.push(item);
      });

      dispatch({type: 'GET_COLLECTION', data})
    }).catch((err) => {
      console.log(`error => ${err}`);
    });
  }
};

export const deleteMedicine = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(collection).doc(id).delete().then(() => {
      dispatch({type: 'DELETE_MEDICINE', id})
    }).catch((err) => {
      console.log(`error => ${err}`);
    });
  }
};

export const editMedicine = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection(collection).doc(id).get().then((doc) => {
      let info = doc.data();
      let id = {id: doc.id};
      let data = {...id, ...info};

      dispatch({type: 'EDIT_MEDICINE', data})
    }).catch((err) => {
      console.log(`error => ${err}`);
    });
  }
};

export const addMedicine = (medicine) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(collection).add(medicine).then((doc) => {
      let id = {id: doc.id};
      let data = {...id, ...medicine};

      dispatch({type: 'ADD_MEDICINE', data})
    }).catch((err) => {
      console.log(`error => ${err}`);
    })
  }
};

export const updateMedicine = (data) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(collection).doc(data.id).set(data).then(() => {
      dispatch({type: 'UPDATE_MEDICINE', data})
    }).catch((err) => {
      console.log(`error => ${err}`);
    });
  }
};