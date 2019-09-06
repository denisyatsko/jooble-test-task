import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import Navigation from './components/Navigation';
import Form from './components/pages/Form';
import SignInPage from './components/pages/SignInPage';
import HomePage from './components/pages/HomePage';
import * as ROUTES from './constants';

import './theme/init.scss';
import Preloader from "./components/preloader";

class App extends Component {
  render() {
    let auth = this.props.auth;

    if (!isLoaded(auth)) {
      return <Preloader center/>
    }

    return (
      <Router>
        <div>
          <Navigation/>
          <Route path={ROUTES.FORM} component={Form}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route exact path={ROUTES.HOME} component={HomePage}/>
          {isEmpty(auth) && <Redirect to={ROUTES.SIGN_IN}/>}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps)(App);
