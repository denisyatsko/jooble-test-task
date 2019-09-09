// Core
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter, Link} from 'react-router-dom';
import {compose} from 'recompose';
import Formsy, {addValidationRule} from 'formsy-react';

// Components
import FormsyInput from '../FormsyInput';

// instruments
import * as ROUTES from '../../constants';
import {addMedicine, updateMedicine} from '../../store/actions/medicinesActions';
import styles from "./styles.module.scss";
import '../../theme/grid.scss';
import '../../theme/default.scss';

class Form extends Component {
  state = {
    step: 1,
    form: null,
  };

  onSubmit = model => {
    const {step} = this.state;
    const id = this.props.match.params.id;

    const submit = (currentFormState) => {
      if (step === 2) {
        if (!id) {
          this.props.addMedicine(currentFormState);
        } else {
          let id = {id: this.props.match.params.id};
          this.props.updateMedicine({...id, ...currentFormState});
        }
        this.props.history.push('/');
      } else {
        this.setStep(step + 1);
      }
    };

    this.setState((prevState) => ({
      form: {...prevState.form, ...model}
    }), () => {
      submit(this.state.form);
    });

  };

  enableButton = () => {
    this.setState({canSubmit: true});
  };

  disableButton = () => {
    this.setState({canSubmit: false});
  };

  setStep = (step, e) => {
    e && e.preventDefault();
    this.setState({step: step})
  };

  setEditMedicineToState = () => {
    const {medicines} = this.props;
    let id = this.props.match.params.id;

    {
      medicines && medicines.map(item => {
        if (item.id === id) {
          this.setState({medicine: item});
        }
      })
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.medicines !== prevProps.medicines) {
      this.setEditMedicineToState();
    }
  }

  componentDidMount() {
    this.setEditMedicineToState();

    addValidationRule('priceInterval', function (values, value, array) {
      return (Number(value) >= Number(array[0]) && Number(value) <= Number(array[1]));
    });
  }

  render() {
    if (!this.props.auth.uid) return <Redirect to={ROUTES.SIGN_IN}/>;
    const {medicine, step} = this.state;

    // const {name, code} = this.state.medicine;
    // const isInvalid = this.refs.form && this.refs.form.state.isValid;
    return (
      <div className='container'>
        <Formsy
          ref='form'
          onValidSubmit={this.onSubmit}
          // onInvalidSubmit={this.onSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          noValidate
          className={styles.form}>
          {
            step === 1 && (
              <div>
                <FormsyInput
                  ref='codeInput'
                  name='code'
                  validations={{minLength: 5, maxLength: 10}}
                  labeltext='Code'
                  validationError='this value must be between 5 and 10 symbol'
                  value={medicine ? this.state.medicine.code : ''}
                  required/>
                <FormsyInput
                  ref='nameInput'
                  name='name'
                  validations={{minLength: 5, maxLength: 100}}
                  labeltext='Name'
                  validationError='this value must be between 5 and 100 symbol'
                  value={medicine ? this.state.medicine.name : ''}
                  required/>
              </div>
            )
          }
          {
            step === 2 && (
              <div>
                <FormsyInput
                  ref='priceInput'
                  name='price'
                  type='number'
                  validations='priceInterval:["0.1", "1000000"]'
                  labeltext='Price'
                  validationError='this value must be between 0.01 and 1 000 000'
                  onFocus={this.onFocus}
                  value={medicine ? this.state.medicine.price : ''}
                  required/>
              </div>
            )
          }


          <div className='d-flex'>
            <Link
              to={ROUTES.HOME}
              className={`btn btn--cancel`}
              type='button'>Cancel
            </Link>
            {/*<button*/}
            {/*  className='btn btn--main'*/}
            {/*  onClick={(e) => {this.setStep(e, step === 1 ? 2 : 1)}}*/}
            {/*  type='button'>*/}
            {/*  {step === 1 ? 'Next' : 'Prev'}*/}
            {/*</button>*/}

            {
              step !== 2 && (
                <button
                  className={`btn btn--main ${!this.state.canSubmit && styles.disabledBtn}`}
                  disabled={!this.state.canSubmit}
                  formNoValidate
                  type='submit'>
                  Next
                </button>
              )
            }
            {
              step !== 1 && (
                <button
                  className='btn btn--main'
                  onClick={(e) => {this.setStep(step - 1, e)}}
                  type='button'>
                  Prev
                </button>
              )
            }
            {
              step === 2 && (
                <button
                  className={`btn btn--main ${!this.state.canSubmit && styles.disabledBtn}`}
                  disabled={!this.state.canSubmit}
                  formNoValidate
                  type='submit'>
                  {medicine ? 'Edit' : 'Create'}
                </button>
              )
            }
          </div>
        </Formsy>
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
