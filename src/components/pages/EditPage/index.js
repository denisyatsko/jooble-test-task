// Core
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editMedicine} from '../../../store/actions/medicinesActions';

// Components
import Form from '../../Form';
import '../../../theme/grid.scss';

class Edit extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    // (id !== 'undefined') && this.props.editMedicine(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        medicines: this.props.medicines,
      })
    }
  }

  render() {
    return(
      <div className='container'>
        <h1>Edit medicine</h1>
        <Form editMode/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editMedicine: (id) => dispatch(editMedicine(id)),
  }
};

const mapStateToProps = (state) => {
  return {
    item: state.collection
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);