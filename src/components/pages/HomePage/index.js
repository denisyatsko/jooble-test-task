import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCollection} from '../../../store/actions/getCollection';
import {signOut} from "../../../store/actions/authActions";

class HomePage extends Component {
    componentDidMount() {
       const data = this.props.getCollection();

        // this.props.getCollection().then(querySnapshot => {
        //
        // });

        // console.log(data)
    }

    render() {
        return (
            <h1>HomePage</h1>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCollection: () => dispatch(getCollection())
    }
};

export default connect(null, mapDispatchToProps)(HomePage);