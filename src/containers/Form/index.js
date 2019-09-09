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
    const {
      addMedicine,
      updateMedicine,
      changeStep,
      setFormValue,
      step,
      form,
      match,
      history
    } = this.props;
    const id = match.params.id;

    const submit = (currentFormState) => {
      if (step === 2) {
        if (!id) {
          addMedicine(currentFormState);
        } else {
          let id = {id: match.params.id};
          updateMedicine({...id, ...currentFormState});
        }

        history.push('/');
      } else {
        changeStep(step + 1);
      }
    };

    setFormValue(model);
    submit({...form, ...model});
  };

  setEditingMedicineToState = () => {
    const {medicines, setFormValue, match} = this.props;
    let id = match.params.id; 

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
    const {auth, step, form, canSubmit, canSubmitState, changeStep, match} = this.props;
    const handleOnValid = () => canSubmit(true);
    const handleOnInvalid = () => canSubmit(false);
    const handleChangeStep = () => changeStep(step - 1);
    const id = match.params.id;

    if (!auth.uid) return <Redirect to={ROUTES.SIGN_IN}/>;

    return (
      <div>
        <Formsy
          onValidSubmit={this.onSubmit}
          onValid={handleOnValid}
          onInvalid={handleOnInvalid}
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
                  onClick={handleChangeStep}
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
                ? id ? 'Edit' : 'Create'
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
