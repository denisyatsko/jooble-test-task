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
    const { name, type, labeltext } = this.props;
    const errorMessage = this.props.getErrorMessage();

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
          type={type}
          onChange={this.changeValue}
          value={this.props.getValue() || ''}
        />
        <span className={styles.errorMessage}>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(FormsyTextarea);
