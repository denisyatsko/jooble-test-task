import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as ROUTES from '../../../constants';
import {addMedicine} from '../../../store/actions/medicinesActions';

const INITIAL_STATE = {};

class Form extends Component {
  state = {...INITIAL_STATE};

  onSubmit = event => {
    event.preventDefault();
    this.props.addMedicine(this.state);
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {name, code} = this.state;
    const isInvalid = name === '' || code === '';

    if (!this.props.auth.uid) return <Redirect to={ROUTES.SIGN_IN}/>;

    return (
      <div>
        <h1>Add new medicine</h1>
        <form onSubmit={this.onSubmit}>
          <input
            name="code"
            // value={}
            onChange={this.onChange}
            type="text"
            placeholder="Code"
          />
          <input
            name="name"
            // value={}
            onChange={this.onChange}
            type="text"
            placeholder="Name"
          />
          <button disabled={isInvalid} type="submit">
            Add
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMedicine: (medicine) => dispatch(addMedicine(medicine))
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
