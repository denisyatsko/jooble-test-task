// Core
import React from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'react-redux-firebase';

// Components
import SignOutButton from '../../components/SignOut';
import AddMedicineButton from '../../components/AddMedicine';

// instruments
import styles from './styles.module.scss';

const Navigation = (props) => {
  let auth = props.auth;

  return (
    <header className={styles.header}>
      {!isEmpty(auth) && (
        <div className={'container'} style={{width: '100%'}}>
          <ul className={styles.list}>
            <li>
              <AddMedicineButton/>
            </li>
            <li>
              <SignOutButton/>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps)(Navigation);


