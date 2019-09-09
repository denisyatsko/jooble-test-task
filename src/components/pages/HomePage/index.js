// Core
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// instruments
import '../../../theme/grid.scss';
import styles from './styles.module.scss';
import * as ROUTES from '../../../constants';
import {getCollection, deleteMedicine} from '../../../store/actions/medicinesActions';

class HomePage extends Component {
  state = {
    medicines: [],
    isLoading: false
  };

  render() {
    const {medicines, deleteMedicine} = this.props;
    const {isLoading} = this.state;

    // console.log(medicines)

    return (
      <div className='container'>
        <ul className={styles.collection}>
          {Array.isArray(medicines) && medicines.map(item =>
            <li key={item.id}>
            <div className={styles.infoWrapper}>
              <span>{item.code}</span>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
              <div className='d-flex justify-content-around'>
                <Link
                  to={`${ROUTES.EDIT}/${item.id}`}
                  className={`btn btn--main ${styles.editButton}`}>Edit
                </Link>
                <button
                  className={`btn ${styles.deleteButton}`}
                  onClick={() => deleteMedicine(item.id)}>Delete
                </button>
              </div>
            </li>)}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMedicine: (id) => dispatch(deleteMedicine(id)),
    getCollection: () => dispatch(getCollection())
  }
};

const mapStateToProps = (state) => {
  return {
    medicines: state.collection,
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
