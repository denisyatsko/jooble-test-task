// Core
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import Formsy, {addValidationRule} from 'formsy-react';
import {Redirect, withRouter, Link} from 'react-router-dom';

// Components
import FormsyInput from '../../components/FormsyInput';
import FormsyTextarea from '../../components/FormsyTextarea';

// instruments
import styles from "./styles.module.scss";
import {routes as ROUTES, validation} from '../../constants';
import {addMedicine, updateMedicine} from '../../store/actions/medicinesActions';
import {changeStep, setFormValue, resetFormValue, canSubmit} from '../../store/actions/formActions';

class Form extends Component {
  constructor(props) {
    super(props);

    addValidationRule('checkInterval', function (values, value, array) {
      return (Number(value) >= Number(array[0]) && Number(value) <= Number(array[1]));
    });
  }

  onSubmit = model => {
    const {changeStep, setFormValue, step} = this.props;
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
        changeStep(step + 1);
      }
    };

    setFormValue(model);
    submit({...this.props.form,...model});
  };

  setEditingMedicineToState = () => {
    const {medicines, setFormValue} = this.props;
    let id = this.props.match.params.id;

    medicines
      .filter(item => item.id === id)
      .map(item => setFormValue(item));
  };

  componentDidUpdate(prevProps) {
    if (this.props.medicines !== prevProps.medicines) {
      this.setEditingMedicineToState();
    }
  }

  componentDidMount() {
    this.setEditingMedicineToState();
  }

  componentWillUnmount() {
    const {changeStep, resetFormValue} = this.props;
    changeStep(1);
    resetFormValue();
  }

  render() {
    if (!this.props.auth.uid) return <Redirect to={ROUTES.SIGN_IN}/>;

    const {step, form, canSubmit, canSubmitState, changeStep} = this.props;

    return (
      <div>
        <Formsy
          onValidSubmit={this.onSubmit}
          onValid={() => canSubmit(true)}
          onInvalid={() => canSubmit(false)}
          noValidate
          className={styles.form}>
          {
            step === 1 && (
              <div>
                <FormsyInput
                  name='code'
                  validations={validation.code.rule}
                  labeltext='Code'
                  validationError={validation.code.error}
                  value={form ? form.code : ''}
                  required/>
                <FormsyInput
                  name='name'
                  validations={validation.name.rule}
                  labeltext='Name'
                  validationError={validation.name.error}
                  value={form ? form.name : ''}
                  required/>
                <FormsyInput
                  name='price'
                  type='number'
                  validations={validation.price.rule}
                  labeltext='Price'
                  validationError={validation.price.error}
                  value={form ? form.price : ''}
                  required/>
                <FormsyInput
                  name='expirationDate'
                  type='number'
                  validations={validation.expirationDate.rule}
                  labeltext='Expiration date'
                  validationError={validation.expirationDate.error}
                  value={form ? form.expirationDate : ''}
                  required/>
              </div>
            )
          }
          {
            step === 2 && (
              <div>
                <FormsyTextarea
                  name='compositionAndFormOfRelease'
                  validations={validation.textarea.rule}
                  labeltext='Composition and form of release'
                  validationError={validation.textarea.error}
                  value={form ? form.compositionAndFormOfRelease : ''}/>
                <FormsyTextarea
                  name='indication'
                  validations={validation.textarea.rule}
                  labeltext='Indication'
                  validationError={validation.textarea.error}
                  value={form ? form.indication : ''}/>
                <FormsyTextarea
                  name='сontraindications'
                  validations={validation.textarea.rule}
                  labeltext='Contraindications'
                  validationError={validation.textarea.error}
                  value={form ? form.сontraindications : ''}/>
              </div>
            )
          }
          <div className={styles.buttonWrapper}>
            <Link
              to={ROUTES.HOME}
              className={`btn btn--cancel ${step === 2 ? styles.cancelBtn : ''}`}
              type='button'>Cancel
            </Link>
            {
              step !== 1 && (
                <button
                  className='btn btn--main'
                  onClick={() => {changeStep(step - 1)}}
                  type='button'>
                  Prev
                </button>
              )
            }
            <button
              className={`btn btn--main ${!canSubmitState && styles.disabledBtn}`}
              disabled={!canSubmitState}
              formNoValidate
              type='submit'>
              {step === 2
                ? form ? 'Edit' : 'Create'
                : 'Next'}
            </button>
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
    changeStep: (step) => dispatch(changeStep(step)),
    setFormValue: (value) => dispatch(setFormValue(value)),
    canSubmit: (value) => dispatch(canSubmit(value)),
    resetFormValue: () => dispatch(resetFormValue()),
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    medicines: state.collection,
    step: state.form.step,
    form: state.form.fields,
    canSubmitState: state.form.canSubmit
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Form);
