// React/Redux
import React from 'react'; 
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom'; 
import { compose } from 'redux'; // bindActionCreators
import { connect } from 'react-redux'; 

// React/Redux Config
import {
    submitLogin, 
    // loginFailed, 
    // loginSucceeded,
    logout
} from './actions';

import reducer from './reducer'; 
import saga from './saga'; 
import makeSelectAppContainer from './selectors'; 

// React/Redux Utils
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// Page Containers
import HomePage from 'containers/HomePage';
import ClassesPage from 'containers/ClassesPage';
import DecksPage from 'containers/DecksPage';
import TranslationsPage from 'containers/TranslationsPage'; 
import InstructionsPage from 'containers/InstructionsPage'; 
import SettingsPage from 'containers/SettingsPage'; 
import LandingPage from 'containers/LandingPage'; 
import FeedbackPage from 'containers/FeedbackPage';
import NotFoundPage from 'containers/NotFoundPage'; 
import RegistrationPage from 'containers/RegistrationPage'; 

// Design
import Toolbar from 'components/Toolbar';
import Footer from 'components/Footer'; 
import NotificationProvider from 'containers/NotificationProvider'


// Styles
import styles from './styles.js'; 

class App extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.toolbar}>
                    <Toolbar 
                        user={this.props.user} 
                        submitLogin={this.props.submitLogin} 
                        logout={this.props.logout}
                    />
                </div>
                <div style={styles.content}>
                    <Switch>
                        <Route path="/" exact render={() => <LandingPage/>} />
                        <Route path="/home" exact render={() => <HomePage {...this.props}/>} />
                        <Route path="/classes" exact render={() => <ClassesPage/>} />
                        <Route path="/decks" exact render={() => <DecksPage/>} />
                        <Route path="/translations" exact render={() => <TranslationsPage/>} />
                        <Route path="/instructions" exact render={() => <InstructionsPage/>} />
                        <Route path="/feedback" exact render={() => <FeedbackPage/>} />
                        <Route path="/settings" exact render={() => <SettingsPage/>} />
                        <Route path="/registration" exact render={() => <RegistrationPage/>} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
                <div style={styles.notifications}>
                    <NotificationProvider/>
                </div>
                <div style={styles.footer}>
                    <Footer/>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

App.propTypes = {}; 


const mapStateToProps = makeSelectAppContainer(); 

const mapDispatchToProps = (dispatch) => {
    return {
        submitLogin: (email, password) => {dispatch(submitLogin(email, password))},
        logout: () => {dispatch(logout())},
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 
const withReducer = injectReducer({ key: 'appContainer', reducer}); 
const withSaga = injectSaga({key: 'appContainer', saga}); 

export default compose(
    withRouter,
    withReducer, 
    withSaga, 
    withConnect
)(App); 