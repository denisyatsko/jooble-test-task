import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCollection} from '../../../store/actions/getCollection';
import Medicines from '../../medicines';
import {signOut} from "../../../store/actions/authActions";

class HomePage extends Component {
    state = {
        medicines: ''
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
        return (
            <div>
                <h1>HomePage</h1>
                <Medicines medicines={this.state.medicines}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCollection: () => dispatch(getCollection())
    }
};

const mapStateToProps = (state) => {
    return {
        medicines: state.collection.data
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);