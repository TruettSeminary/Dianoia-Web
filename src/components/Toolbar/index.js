import React from 'react'; 
import PropTypes from 'prop-types';

import withStyles from "material-ui/styles/withStyles"; 
import ToolbarStyle from './styles'; 

import Header from 'md-components/Header/Header'; 
import HeaderLinks from 'md-components/Header/HeaderLinks'; 

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
                rightLinks={(<HeaderLinks 
                    user={this.props.user} 
                    submitLogin={this.props.submitLogin}
                    logout={this.props.logout}
                />)}
            />
        );
    }
}

Toolbar.propTypes = {
    user: PropTypes.object.isRequired,
    submitLogin: PropTypes.func,
    logout: PropTypes.func
}

export default withStyles(ToolbarStyle)(Toolbar); 