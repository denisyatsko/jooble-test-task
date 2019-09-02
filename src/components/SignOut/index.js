import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignOutButton = (props) => (
    <button
        type='button'
        onClick={props.signOut}>
        Sign Out
    </button>
);

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignOutButton);