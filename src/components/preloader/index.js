// Core
import React from 'react';

// Instruments
import spinner from '../../images/spinner.svg';
import styles from './styles.module.scss';

let Preloader = (props) => {
  console.log(props.center);
  return <img
    className={`${styles.preloader} ${(props.center) ? styles.center : ''}`}
    src={spinner}
    alt='preloader'/>;
};

export default Preloader;
