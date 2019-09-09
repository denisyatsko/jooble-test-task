// // Core
import { withFormsy } from 'formsy-react';
import React from 'react';

// // Instruments
import styles from '../FormsyInput/styles.module.scss';

class FormsyTextarea extends React.Component {
  changeValue = (event) => {
    const {setValue} = this.props;

    setValue(event.currentTarget.value);
  };

  render() {
    const { name, labeltext, getErrorMessage, getValue } = this.props;
    const value = getValue() || '';

    return (
      <div className={styles.item}>
        <label
          className={styles.title}
          htmlFor={name}>
          {labeltext}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={this.changeValue}/>
        <span className={styles.errorMessage}>{getErrorMessage()}</span>
      </div>
    );
  }
}

export default withFormsy(FormsyTextarea);
