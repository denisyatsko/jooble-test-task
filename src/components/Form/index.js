// Core
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter, Link} from 'react-router-dom';
import {compose} from 'recompose';

// instruments
import * as ROUTES from '../../constants';
import {addMedicine, updateMedicine} from '../../store/actions/medicinesActions';
import styles from "./styles.module.scss";
import '../../theme/grid.scss';

const INITIAL_STATE = {};

class Form extends Component {
  state = {...INITIAL_STATE};

  onSubmit = event => {
    event.preventDefault();
    let id = this.props.match.params.id;

    if (!id) {
      this.props.addMedicine(this.state);
    } else {
      let id = {id: this.props.match.params.id};
      this.props.updateMedicine({...id, ...this.state});
    }
    this.props.history.push('/');
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {name, code} = this.state;
    const {medicines} = this.props;
    const isInvalid = name === '' || code === '';
    let id = this.props.match.params.id;

    if (!this.props.auth.uid) return <Redirect to={ROUTES.SIGN_IN}/>;

    return (

      <div className='container'>

        {medicines && medicines.map(item => {
          if (item.id === id) {
            return <div key={item.id}><p>{item.code}</p><p>{item.name}</p></div>
          }
        })}

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
        <Link
          to={ROUTES.HOME}
          className={`btn btn--cancel`}
          type='button'>Cancel
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMedicine: (medicine) => dispatch(addMedicine(medicine)),
    updateMedicine: (medicine) => dispatch(updateMedicine(medicine)),
  }
};

const mapStateToProps = (state, props) => {
  return {
    auth: state.firebase.auth,
    medicines: state.collection,
    // item: (props.editMode) ? state.collection : false
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Form);
