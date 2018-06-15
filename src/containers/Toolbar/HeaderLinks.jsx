/* eslint-disable */
import React from "react";
import PropTypes from "prop-types"; 
import { connect } from 'react-redux';
import { compose } from 'redux'; 

import { push } from 'connected-react-router'

import { 
  submitLogin, 
  logout
} from 'collections/user/actions'; 

import {
  headerLinkSelector
} from './selectors'

// material-ui components
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import CustomDropdown from "md-components/CustomDropdown/CustomDropdown.jsx";
import Button from "md-components/CustomButtons/Button.jsx";

// Custom Components
import LoginModal from 'components/Login'; 

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

import withStyles from "material-ui/styles/withStyles";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";


class HeaderLinks extends React.Component {
  constructor(props) {
    super(props); 

    this.classes = props.classes;
    this.state = {
      displayLogin: false, 
      ...props
    }; 
  }

  formButton(link) {
    return (<Button
        color='transparent'
        className={this.classes.navLink}
        onClick={() => {
          if(link.href) {
            this.props.pushPage(link.href); 
          }
          if(link.onClick) {
            link.onClick();
          } 
        }}>
      {link.icon} {link.text}
    </Button>); 
  }

  formDropDown(link) {
    const formDropDownList = () => {
      return link.content.map((item)=> {
        return (
          <a
            className={this.classes.dropdownLink}
            href=''
            onClick={(e) => {
              e.preventDefault(); 
              console.log('clicking'); 
              this.props.pushPage(item.href); 
              
            }}
          >
          {item.text}</a>
        );
      }); 
    };

    return ( 
      <CustomDropdown
      buttonText={link.text}
      buttonProps={{
        className: this.classes.navLink,
        color: link.color
      }}
      dropdownList={formDropDownList()}
      />);
  }

  formLink(link) {
    const formContent = () => {
      if(!link.content) {
        return this.formButton(link); 
      }
      else {
        return this.formDropDown(link); 
      }
    }

    return(
      <ListItem key={link.text} className={this.classes.listItem}>
        {formContent()}
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

    const deckLinks = this.props.user.decks.map((deck) => {
      // TODO: find a more effeciant way of doing this

      return {
        text: deck.name, 
        href: `/deck/${deck._id}`
      }
    }); 

    const links = [
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
        content: deckLinks,
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


    const renderLinks = links.filter((link) => {
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

HeaderLinks.propTypes = {}

const mapStateToProps = headerLinkSelector(); 

const mapDispatchToProps = (dispatch) => {
  return {
    pushPage: (route) => {
      dispatch(push(route))
    },
    submitLogin: (identifier, password) => {
      dispatch(submitLogin(identifier, password)); 
    }, 
    logout: () => {
      dispatch(logout()); 
    },
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose (
  withStyles(headerLinksStyle), 
  withConnect
)(HeaderLinks); 
