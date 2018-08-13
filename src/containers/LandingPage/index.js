// React/Redux
import React from 'react'; 
import { connect } from 'react-redux';
import { compose } from 'redux'; 

import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 
import Button from 'md-components/CustomButtons/Button'; 

import { Router } from 'utils/router'; 
import { UIManager } from 'utils/ui'; 
import { logout } from 'collections/user/actions'; 

import './styles.css'; 

class LandingPage extends React.Component {

    getHeaderButtons() {
        if(this.props.auth) {
            return (
                <div>
                    <Button onClick={()=> Router.pushPage('/home')}>
                        Home
                    </Button>
                    <Button onClick={() => this.props.logout() }>
                        Logout
                    </Button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Button onClick={()=> UIManager.openLogin()}>
                        Login
                    </Button>
                    <Button onClick={() => Router.pushPage('/registration') }>
                        Register
                    </Button>
                </div>
            );   
        }
    }

    render() {
        return (
            <div className="landingContainer">
                <div className="bannerContainer">
                    <div className="welcomeBanner">
                            <h1>Dianoia</h1>
                            <h3>Deep language learning</h3>
                            {this.getHeaderButtons()}
                    </div>
                </div>
                <div className="landingContent">
                    <GridContainer>
                        <GridItem 
                        xs={12} sm={12} md={4} lg={4} xl={4}
                        className="landingContentItem">
                            <div>
                                <h3 className="sectionHeader">
                                    What is Dianoia?
                                </h3>
                                <p className="sectionDetails">
                                    Dianoia is a custom language learning app built for Truett Seminary.
                                    The name Dianoia comes from the greek word διάνοια, which means deep
                                    knowledge. 
                                </p>
                                <p className="sectionDetails">
                                    Dianoia combines traditional flash cards with interactive translation
                                    practice. As you study, words that you have more trouble with will
                                    show up with greater frequency. The same goes for translation practice.
                                    When you have trouble with a word in a translation, it will show up 
                                    more often so you can learn it better!
                                </p>
                            </div>
                        </GridItem>
                        <GridItem 
                        xs={12} sm={12} md={4} lg={4} xl={4}
                        className="landingContentItem">
                            <div> 
                                <h3 className="sectionHeader">
                                    Get started using Dianoia
                                </h3>
                                <p className="sectionDetails">
                                    If you have not done so yet, follow the registeration link above. 
                                    After that, you can select between viewing your classes, decks, 
                                    or translations from the menu above. 
                                </p>
                                <p className="sectionDetails">
                                    Unlike other flash card and language apps, your professor is in 
                                    charge of the content that shows up here. As your professor publishes
                                    more decks and translations for your class, you will have the option of 
                                    subscribing to them. Once you do so, they will show up in the menu bar
                                    for you to choose from. 
                                </p>
                                <p className="sectionDetails">
                                    For more information, head to the{' '}<a onClick={(event) => {
                                        event.preventDefault(); 
                                        Router.pushPage('/instructions');
                                    }}>
                                        instructions page. 
                                    </a>
                                </p>
                            </div>
                        </GridItem>
                        <GridItem
                        xs={12} sm={12} md={4} lg={4} xl={4}
                        className="landingContentItem">
                            <div>
                                <h3 className="sectionHeader">
                                    Who can use Dianoia?
                                </h3>
                                <p className="sectionDetails">
                                    Dianoia has been specifically designed for students taking Greek at
                                    Truett seminary. This does not mean, however, that others cannot join 
                                    in the fun. Anyone who wants can sign up and subscribe to available classes
                                    and decks.  
                                </p>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout()); 
    },
    dispatch
  }
}

const withConnect = connect(null, mapDispatchToProps);

export default compose (
    withConnect
)(LandingPage);