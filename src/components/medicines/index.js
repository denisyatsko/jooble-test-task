import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteMedicine, getCollection} from '../../store/actions/medicinesActions';

let ID = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

class Medicines extends Component {
  state = {
    // medicines: []
  };

  // deleteMedicine = (id) => {
  //   console.log(id)
  //   this.props.deleteMedicine(id)
  // };

  listView = (g) => {
    return(
      //  { g.code } -> { g.id }  and this id must random
      <li className="collection-item" key={ g.id } >
        { g.name }
        <span>{ g.code }</span>
        <Link className='secondary-content' to='/'>
          <i className='material-icons'>edit</i>
        </Link>
        <button
          onClick={() => this.props.deleteMedicine(g.name)}
          // onClick={() => this.deleteMedicine(g.name)}
          type='button'>
          <i className='material-icons'>delete</i>
        </button>
      </li>
    )
  };

  componentDidMount() {
    this.props.getCollection();
  }

  componentDidUpdate(prevProps) {
    if (this.props.medicines !== prevProps.medicines) {
      this.setState({medicines: this.props.medicines})
    }
  }

  render() {
    const { medicines, deleteMedicine } = this.props;
    let JSX;
    // console.log(this.props);


    // medicines.length === 0 ?
    //   JSX = <h5>You haven't set a medicines</h5> :
    //   JSX = medicines.map( g => {
    //     return (
    //       <li className="collection-item" key={ g.id } >
    //         { g.name }
    //         <Link className='secondary-content' to='/'>
    //           <i className='material-icons'>edit</i>
    //         </Link>
    //         <button
    //           onClick={() => deleteMedicine(g.name)}
    //           // onClick={() => this.deleteMedicine(g.name)}
    //           type='button'>
    //           <i className='material-icons'>delete</i>
    //         </button>
    //       </li>
    //     )
    //   });{/*{ JSX }*/}

    return(
      <div>
        <ul className="collection">

          {medicines && medicines.map((g) => this.listView(g))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    medicines: state.collection.data
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMedicine: (id) => { dispatch(deleteMedicine(id))},
    getCollection: () => dispatch(getCollection())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Medicines);
