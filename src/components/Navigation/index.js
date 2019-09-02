import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants';
import SignOutButton from '../SignOut';
import {connect} from 'react-redux';

const Navigation = (props) => {
    const { auth } = props;
    const isAuth = auth.uid;
    return(
        <div>{isAuth ? <NavigationAuth/> : <NavigationNonAuth/>}</div>
    );
};

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <SignOutButton/>
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(Navigation);