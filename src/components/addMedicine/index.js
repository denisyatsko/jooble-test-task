// Core
import React from 'react';
import {connect} from 'react-redux';
// import {addMedicine} from '../../store/actions/medicinesActions';
import { Icon } from 'react-icons-kit';
import {androidAddCircle} from 'react-icons-kit/ionicons/androidAddCircle';

// instruments
import styles from './styles.module.scss';

const AddMedicineButton = () =>  {
  return(
    <div className={styles.btn}>
      <Icon
        title='add medicine'
        icon={androidAddCircle}
        size={'100%'}/>
    </div>
  )
};

export default AddMedicineButton;
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addMedicine: () => dispatch(addMedicine())
//   }
// };
//
// export default connect(null, mapDispatchToProps)(AddMedicineButton);
