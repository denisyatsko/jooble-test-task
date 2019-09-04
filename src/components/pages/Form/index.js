import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addMedicine} from '../../../store/actions/medicinesActions';

const INITIAL_STATE = {};

let ID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

class Form extends Component {
    state = {...INITIAL_STATE};

    onSubmit = event => {
        event.preventDefault();
        let medicine = {
            ...{id: ID()},
            ...this.state,
        };
        this.props.addMedicine(medicine);
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {name, code} = this.state;
        const isInvalid = name === '' || code === '';

        return(
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

export default connect(null, mapDispatchToProps)(Form);
