// React/Redux
import React from 'react'; 

import { compose } from 'redux'; 
import { connect } from 'react-redux';

import { toolbarSelector } from './selectors'; 


// Design
import Header from './Header'; 
import HeaderLinks from './HeaderLinks'; 

class Toolbar extends React.Component {

    render() {
        const brand = {
            title: 'Dianoia', 
            href: this.props.user.jwt && this.props.user.jwt !== "" ? '/home' : '/'
        };
        return (
            <Header
                color="success"
                brand={brand}
                rightLinks={(<HeaderLinks/>)}
            />
        );
    }
}

Toolbar.propTypes = {}

const mapStateToProps = toolbarSelector(); 

const mapDispatchToProps = (dispatch) =>  {
    return {
        dispatch
    }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(Toolbar); 