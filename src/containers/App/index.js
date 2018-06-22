// React/Redux
import React from 'react'; 
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import { compose } from 'redux'; // bindActionCreators
import { connect } from 'react-redux';

import qs from 'query-string'; 

import {
    appSelector
} from './selectors'; 

// Page Containers
import HomePage from 'containers/HomePage';
import ClassesPage from 'containers/ClassesPage';
import DeckPage from 'containers/DeckPage';
import StudyDeckPage from 'containers/StudyDeckPage'; 
import CardPage from 'containers/CardPage'; 
import TranslationsPage from 'containers/TranslationsPage'; 
import InstructionsPage from 'containers/InstructionsPage'; 
import SettingsPage from 'containers/SettingsPage'; 
import LandingPage from 'containers/LandingPage'; 
import FeedbackPage from 'containers/FeedbackPage';
import NotFoundPage from 'containers/NotFoundPage'; 
import RegistrationPage from 'containers/RegistrationPage'; 
import ForgotPasswordPage from 'containers/ForgotPasswordPage'; 
import ResetPasswordPage from 'containers/ResetPasswordPage'; 

// Design
import Toolbar from 'containers/Toolbar';
import Footer from 'components/Footer'; 
import NotificationProvider from 'containers/NotificationProvider'


// Styles
import styles from './styles.js'; 



class App extends React.Component {


    render() {

        const PrivateRoute = ({ component: Component, ...rest }) => {
            return(<Route {...rest} render={(props) => {
                return ( this.props.user.jwt && this.props.user.jwt !== ""
                ? <Component {...props} />
                : <Redirect to='/' />);
            }}/>);
        }

        return (
            <div style={styles.container}>
                <div style={styles.toolbar}>
                    <Toolbar />
                </div>
                <div style={styles.content}>
                    <Switch>
                        <Route path="/" exact render={() => <LandingPage/>} />

                        <PrivateRoute path="/home" exact component={() => <HomePage {...this.props}/>} />
                        <PrivateRoute path="/classes" exact component={() => <ClassesPage/>} />
                        <PrivateRoute path="/deck/study/:deck_id" exact component={(props) => {
                            return <StudyDeckPage deck_id={props.match.params.deck_id}/>
                        }}/>
                        <PrivateRoute path="/deck/:deck_id/" exact component={(props) => {
                            return <DeckPage deck_id={props.match.params.deck_id}/>
                        }}/>
                        <PrivateRoute path="/card/:card_id/:details?" component={(props) => {
                            return (<CardPage 
                                card_id={props.match.params.card_id}
                                details={props.match.params.details}
                            />); 
                        }}/>
                        <PrivateRoute path="/translations" exact component={() => <TranslationsPage/>} />

                        <PrivateRoute path="/feedback" exact component={() => <FeedbackPage/>} />
                        <PrivateRoute path="/settings" exact component={() => <SettingsPage/>} />
                        <Route path="/registration" exact render={() => <RegistrationPage/>} />
                        <Route path="/forgot-password" exact render={() => <ForgotPasswordPage/>} />
                        <Route path="/reset-password/" exact render={(props) => {
                            const code = qs.parse(props.location.search).code
                            return(<ResetPasswordPage code={code}/>); 
                        }}/>
                        <Route path="/instructions" exact render={() => <InstructionsPage/>} />
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

const mapStateToProps = appSelector(); 

const mapDispatchToProps = (dispatch) =>  {
    return {
        dispatch
    }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect,
    withRouter
)(App); 