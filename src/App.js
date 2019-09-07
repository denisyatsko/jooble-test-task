import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import {deleteMedicine, getCollection} from './store/actions/medicinesActions';

import Navigation from './components/Navigation';
import SignInPage from './components/pages/SignInPage';
import AddPage from './components/pages/AddPage';
import EditPage from './components/pages/EditPage';
import HomePage from './components/pages/HomePage';
import * as ROUTES from './constants';

import './theme/init.scss';
import Preloader from './components/preloader';

class App extends Component {
  componentDidMount() {
    this.props.getCollection();
  }

  componentDidUpdate(prevProps) {
    if (this.props.medicines !== prevProps.medicines) {
      this.setState({
        medicines: this.props.medicines,
      })
    }
  }

  render() {
    let auth = this.props.auth;

    if (!isLoaded(auth)) {
      return <Preloader center/>
    }

    return (
      <Router>
        <div>
          <Navigation/>
          <Route path={ROUTES.ADD} component={AddPage}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route exact path={ROUTES.HOME} component={HomePage}/>
          {/*<Route path={`${ROUTES.EDIT}`} component={EditPage}/>*/}
          <Route path={`${ROUTES.EDIT}/:id`} component={EditPage}/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getCollection: () => dispatch(getCollection())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
