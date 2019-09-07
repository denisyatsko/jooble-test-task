// Core
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {isEmpty} from 'react-redux-firebase';

// Components
import SignOutButton from '../SignOut';
import AddMedicineButton from '../addMedicine';

// instruments
import * as ROUTES from '../../constants';
import styles from './styles.module.scss';
import '../../theme/grid.scss';

const Navigation = (props) => {
  let auth = props.auth;

  return (
    <header className={styles.header}>
      {!isEmpty(auth) && (
        <div className={'container'} style={{width: '100%'}}>
          <ul className={styles.list}>
            <li>
              <Link to={ROUTES.ADD}><AddMedicineButton/></Link>
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


