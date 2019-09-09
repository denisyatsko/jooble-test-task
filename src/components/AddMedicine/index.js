// Core
import React from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {androidAddCircle} from 'react-icons-kit/ionicons/androidAddCircle';

// instruments
import styles from './styles.module.scss';
import {routes as ROUTES} from '../../constants';

const AddMedicineButton = () =>  {
  return(
    <Link to={ROUTES.ADD} className={styles.btn}>
      <Icon
        title='add medicine'
        icon={androidAddCircle}
        size={'100%'}/>
    </Link>
  )
};

export default AddMedicineButton;
