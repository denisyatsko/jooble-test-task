import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {connect} from 'react-redux';
// import { withFirebase } from 'react-redux-firebase'
import {withFirebase} from './firebase';
import {compose} from 'recompose';

import Navigation from './components/Navigation';
import LandingPage from './components/pages/LandingPage';
import SignInPage from './components/pages/SignInPage';
import HomePage from './components/pages/HomePage';
import * as ROUTES from './constants';


import {asynGetTracks} from './store/actions/tracks';

import './App.css';

class App extends Component {
    state = {
        authUser: null
    };

    // componentDidMount() {
    //     this.listener = this.props.firebase.auth.onAuthStateChanged(
    //         authUser => {
    //             authUser
    //                 ? this.setState({authUser})
    //                 : this.setState({authUser: null});
    //         });
    // }
    //
    // componentWillUnmount() {
    //     this.listener();
    // }

    _click = () => {
        this.props.addToList(this.state.value);
        this.setState({value: ''});
    };

    _getTracks = () => {
        this.props.onGetTracks()
    };

    _onChange = (e) => {
        this.setState({value: e.target.value})
    };

    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser}/>
                    <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.HOME} component={HomePage}/>
                </div>
            </Router>
        );
    }
}

export default compose(
    withFirebase,
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
            },
            onGetTracks: () => {
                dispatch(asynGetTracks());
            }
        }))
)(App);
