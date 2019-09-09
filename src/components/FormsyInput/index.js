// // Core
import { withFormsy } from 'formsy-react';
import React from 'react';

// // Instruments
import styles from './styles.module.scss';

class FormsyInput extends React.Component {
  _changeValue = (event) => {
    const { _mergeState, setValue, name } = this.props;
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    setValue(event.currentTarget.value);

    // if (this.props.state === true) _mergeState('order', { [name]: event.currentTarget.value });
  };

  render() {
    const { name, type, labeltext, onFocus } = this.props;

    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();

    // const className = this.props.getErrorMessage() ? `${styles.error}` : '';

    return (
      <div className={styles.item}>
        <label
          className={styles.title}
          htmlFor={name}>
          {labeltext}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          // placeholder={placeholder}
          onFocus={onFocus}
          onChange={this._changeValue}
          value={this.props.getValue() || ''}
          // className={className}
        />
        <span className={styles.errorMessage}>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(FormsyInput);
