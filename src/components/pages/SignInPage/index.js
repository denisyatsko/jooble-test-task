// Core
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// Instruments
import '../../../theme/grid.scss';
import styles from './styles.module.scss';
import * as ROUTES from '../../../constants';
import {signIn} from '../../../store/actions/authActions';

const INITIAL_STATE = {
    email: 'yatskodi@gmail.com',
    password: 'cEj!KCq9%RhK',
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.signIn(this.state);
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password} = this.state;
        const isInvalid = password === '' || email === '';
        const {authError, auth} = this.props;

        if (auth.uid) { return <Redirect to={ROUTES.HOME}/> }

        return (
            <div className='container'>
                <h1>SignIn</h1>
                <form
                  className={styles.SignInForm}
                  onSubmit={this.onSubmit}>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                    <button
                      disabled={isInvalid}
                      className={`btn btn--main ${styles.submitBtn}`}
                      type="submit">
                        Sign In
                    </button>
                    {authError && <p>{authError}</p>}
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
};

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
