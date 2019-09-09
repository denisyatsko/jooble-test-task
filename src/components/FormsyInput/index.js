// // Core
import { withFormsy } from 'formsy-react';
import React from 'react';

// // Instruments
import styles from './styles.module.scss';

class FormsyInput extends React.Component {
  changeValue = (event) => {
    const {setValue} = this.props;

    setValue(event.currentTarget.value);
  };

  render() {
    const { name, type, labeltext, getErrorMessage, getValue } = this.props;
    const value = getValue() || '';

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
          value={value}
          onChange={this.changeValue}/>
        <span className={styles.errorMessage}>{getErrorMessage()}</span>
      </div>
    );
  }
}

export default withFormsy(FormsyInput);
