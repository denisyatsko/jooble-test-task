import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Navigation from './components/Navigation';
import Form from './components/pages/Form';
import SignInPage from './components/pages/SignInPage';
import HomePage from './components/pages/HomePage';
import * as ROUTES from './constants';

import './theme/init.scss';

class App extends Component {
  state = {};

  render() {


    return (
      <Router>
        <div>
          <Navigation/>
          <Route path={ROUTES.FORM} component={Form}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route exact path={ROUTES.HOME} component={HomePage}/>
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
