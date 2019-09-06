// Core
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// instruments
import {getCollection, deleteMedicine} from '../../../store/actions/medicinesActions';
import '../../../theme/grid.scss';
import styles from './styles.module.scss';

class HomePage extends Component {
  state = {
    medicines: [],
    isLoading: false
  };

  componentDidMount() {
    // this.setState({isLoading: true});
    this.props.getCollection();
  }

  componentDidUpdate(prevProps) {
    if (this.props.medicines !== prevProps.medicines) {
      this.setState({
        medicines: this.props.medicines,
        // isLoading: false
      })
    }
  }

  render() {
    const {medicines, deleteMedicine} = this.props;
    const {isLoading} = this.state;

    let auth = this.props.auth;

    // if (!this.props.auth.uid) return <Redirect to={ROUTES.SIGN_IN}/>;

    // return <Preloader/>;

    // if (!isLoaded(auth)) {
    //   return <Preloader/>
    // }
    // if (isEmpty(auth)) {
    //   return <Redirect to={ROUTES.SIGN_IN}/>;
    // }

    return (
      <div className='container'>
        <ul className={styles.collection}>
          {medicines && medicines.map(item =>
            <li key={item.id}>{item.task}
            <div className={styles.infoWrapper}>
              <span>{item.code}</span>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
              <div className='d-flex justify-content-around'>
                <button
                  className={`btn btn--main ${styles.editButton}`}>Edit
                </button>
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
