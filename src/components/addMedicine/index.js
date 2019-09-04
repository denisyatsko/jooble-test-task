import React from 'react';
import {connect} from 'react-redux';
import {addMedicine} from '../../store/actions/medicinesActions';

const AddMedicineButton = (props) => (
  <button
    type='button'
    onClick={props.addMedicine}>
    Add medicine!
  </button>
);

const mapDispatchToProps = (dispatch) => {
  return {
    addMedicine: () => dispatch(addMedicine())
  }
};

export default connect(null, mapDispatchToProps)(AddMedicineButton);
