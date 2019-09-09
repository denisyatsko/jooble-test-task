// Core
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isLoaded, isEmpty} from 'react-redux-firebase';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

// Components
import Preloader from '../../components/preloader';
import Navigation from '../Navigation';
import SignInPage from '../pages/SignInPage';
import AddPage from '../pages/AddPage';
import EditPage from '../pages/EditPage';
import HomePage from '../pages/HomePage';

// Instruments
import '../../theme/init.scss';
import {routes as ROUTES} from '../../constants';
import {getCollection} from '../../store/actions/medicinesActions';

class Index extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
