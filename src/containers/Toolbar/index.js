// React/Redux
import React from 'react'; 

import { compose } from 'redux'; 
import { connect } from 'react-redux';

import { toolbarSelector } from './selectors'; 

import { 
    submitLogin, 
    logout
} from 'collections/user/actions'; 

// Design
import Header from 'md-components/Header/Header'; 
import HeaderLinks from 'md-components/Header/HeaderLinks'; 

class Toolbar extends React.Component {

    render() {
        const brand = {
            title: 'Dianoia', 
            href: this.props.jwt && this.props.jwt !== "" ? '/home' : '/'
        };
        return (
            <Header
                color="success"
                brand={brand}
                rightLinks={(<HeaderLinks 
                    userJWT={this.props.jwt} 
                    submitLogin={this.props.submitLogin}
                    logout={this.props.logout}
                />)}
            />
        );
    }
}

Toolbar.propTypes = {}

const mapStateToProps = toolbarSelector(); 

const mapDispatchToProps = (dispatch) =>  {
    return {
        submitLogin: (email, password) => {dispatch(submitLogin(email, password))},
        logout: () => {dispatch(logout())},
        dispatch
    }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(Toolbar); 