import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCollection, deleteMedicine} from '../../../store/actions/medicinesActions';
// import Medicines from '../../medicines';
import {Redirect} from 'react-router-dom';
import * as ROUTES from '../../../constants';
import '../../../theme/grid.scss';

class HomePage extends Component {
  state = {
    medicines: []
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to={ROUTES.SIGN_IN}/>;

    return (
      <div className='container'>
        <h1>HomePage</h1>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCollection: () => dispatch(getCollection())
  }
};

const mapStateToProps = (state) => {
  return {
    medicines: state.collection.data,
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
