// TODO: move submitLogin and Logout actions here for cleaner code

/* eslint-disable */
import React from "react";
import PropTypes from "prop-types"; 

import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { compose } from 'redux'; 

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Tooltip from "material-ui/Tooltip";

// @material-ui/icons
import {
  AccountCircle,
  Class,
  ExitToApp,
  Feedback,
  Info,
  Settings,
  Subject,
  ViewCarousel
} from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.jsx";
import Button from "../CustomButtons/Button.jsx";
import IconButton from "../CustomButtons/IconButton.jsx";

import LoginModal from 'components/Login'; 

import headerLinksStyle from "./headerLinksStyle.jsx";


class HeaderLinks extends React.Component {
  constructor(props) {
    super(props); 

    this.classes = props.classes;
    this.state = {
      displayLogin: false, 
      ...props
    }; 

    this.links = [
      {
        text: 'Classes',
        href:'/classes', 
        color:'transparent', 
        icon: (<Class className={this.classes.icons} />), 
        userLoggedIn: true
      },
      {
        text: 'Decks',
        href:'/decks', 
        color:'transparent', 
        icon: (<ViewCarousel className={this.classes.icons} />), 
        userLoggedIn: true
      },
      {
        text: 'Translations',
        href:'/translations', 
        color:'transparent', 
        icon: (<Subject className={this.classes.icons} />), 
        userLoggedIn: true
      },
      {
        text: 'Instructions',
        href:'/instructions', 
        color:'transparent', 
        icon: (<Info className={this.classes.icons} />), 
        userLoggedIn: true
      },
      {
        text: 'Feedback',
        href:'/feedback', 
        color:'transparent', 
        icon: (<Feedback className={this.classes.icons} />), 
        userLoggedIn: true
      },
      {
        text: 'Settings',
        href:'/settings', 
        color:'transparent', 
        icon: (<Settings className={this.classes.icons} />), 
        userLoggedIn: true
      },
      {
        text: 'Logout',
        href:'/', 
        color:'transparent', 
        icon: (<ExitToApp className={this.classes.icons} />), 
        onClick:() => this.props.logout(),
        userLoggedIn: true
      },
      {
        // TODO: redirect on success login and close sidebar
        text: 'Login',
        href:'', 
        color:'transparent', 
        icon: (<AccountCircle className={this.classes.icons} />),
        onClick: this.handleOpenLoginModel, 
        userLoggedIn: false
      }
    ];  
  }

  formLink(link) {
    return(
      <ListItem key={link.text} className={this.classes.listItem}>
        <Button
            color={link.color}
            className={this.classes.navLink}
            onClick={() => {
              if(link.href) {
                console.log('pushing'); 
                this.props.pushPage(link.href); 
              }
              if(link.onClick) {
                link.onClick();
              } 
            }}>
          {link.icon} {link.text}
        </Button>
      </ListItem>
    );
  }

  handleOpenLoginModel = () => {
    this.setState({
      displayLogin: true
    });
  }

  handleCloseLoginModal = () => {
    this.setState({
      displayLogin: false
    });
  }


  render() {

    const renderLinks = this.links.filter((link) => {
      let userLoggedIn = (this.props.user.jwt !== null && this.props.user.jwt !== ""); 
      return link.userLoggedIn == userLoggedIn; 
    }).map((link) => {
      return this.formLink(link);
    });
  
  
    return (
      <div>
        <List className={this.classes.list}>
          {renderLinks}
        </List>
        <LoginModal
          pushPage={this.props.pushPage} 
          display={this.state.displayLogin} 
          handleCloseModal={this.handleCloseLoginModal}
          submitLogin={this.props.submitLogin}
          ></LoginModal>
      </div>
    );
  }
  
}

HeaderLinks.propTypes = {
  user: PropTypes.object.isRequired, 
  submitLogin: PropTypes.func, 
  logout: PropTypes.func
}

// TODO: propbably run into issues with this
const mapStateToProps = () => {
  return {}; 
}; 

// TODO: move submitLogin and Logout actions here for cleaner code
const mapDispatchToProps = (dispatch) => {
  return {
    pushPage: (route) => {dispatch(push(route))}, 
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose (
  withStyles(headerLinksStyle), 
  withConnect
)(HeaderLinks); 
