// Core
import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';
import { Icon } from 'react-icons-kit';
import {signOut as signOutIcon} from 'react-icons-kit/fa/signOut';

// instruments
import styles from './styles.module.scss';

const SignOutButton = (props) => (
    <button
        type='button'
        className={styles.btn}
        onClick={props.signOut}>
        <Icon
          title='log out'
          icon={signOutIcon}
          size={'100%'}/>
    </button>
);

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignOutButton);
