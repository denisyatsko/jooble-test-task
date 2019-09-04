import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import Navigation from './components/Navigation';
import Form from './components/pages/Form';
import SignInPage from './components/pages/SignInPage';
import HomePage from './components/pages/HomePage';
import * as ROUTES from './constants';


import './App.css';

class App extends Component {
    state = {
        authUser: null
    };

    _click = () => {
        this.props.addToList(this.state.value);
        this.setState({value: ''});
    };

    _onChange = (e) => {
        this.setState({value: e.target.value})
    };

    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser}/>
                    <Route exact path={ROUTES.FORM} component={Form}/>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.HOME} component={HomePage}/>
                </div>
            </Router>
        );
    }
}

export default compose(
    // withFirebase,
    connect(
        state => ({
            tracks: state.tracks
        }),
        dispatch => ({
            addToList: (value) => {
                const payload = {
                    id: Date.now().toString(),
                    value
                };
                dispatch({type: 'TEST_DISPATCH', payload})
            }
        }))
)(App);
