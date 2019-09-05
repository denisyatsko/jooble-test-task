import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants';
import SignOutButton from '../SignOut';
import {connect} from 'react-redux';
import styles from './styles.module.scss';
import AddMedicineButton from '../addMedicine';
import '../../theme/grid.scss';

const Navigation = (props) => {
    const { auth } = props;
    const isAuth = auth.uid;
    return(
        <div className={styles.listWrapper}>
          {isAuth ? <NavigationAuth/> : <NavigationNonAuth/>}
        </div>
    );
};

const NavigationAuth = () => (
    <ul className={`${styles.list} container`}>
        <li>
            <Link to={ROUTES.FORM}><AddMedicineButton/></Link>
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
    <ul className={styles.list}>
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


