// React/Redux
import React from 'react'; 
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom'; 
import PrivateRoute from './PrivateRoute';
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
import TranslationDeckPage from 'containers/TranslationDeckPage'; 
import TranslationPage from 'containers/TranslationPage'; 
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
import './styles.css'; 



class App extends React.Component {


    render() {

        return (
            <div className="appContainer">
                <div className="toolbar">
                    <Toolbar />
                </div>
                <div className="content">
                    <Switch>
                        <Route path="/" exact render={() => <LandingPage auth={this.props.user.jwt}/>} />

                        <PrivateRoute path="/home" auth={this.props.user.jwt} exact  render={() => <HomePage {...this.props}/>} />
                        <PrivateRoute path="/classes" auth={this.props.user.jwt} exact render={() => <ClassesPage/>} />
                        <PrivateRoute path="/deck/study/:deck_id" auth={this.props.user.jwt} exact  render={(props) => {
                            return <StudyDeckPage deck_id={props.match.params.deck_id}/>
                        }}/>
                        <PrivateRoute path="/deck/translations/:deck_id/" exact auth={this.props.user.jwt} render={(props) => {
                            return <TranslationDeckPage deck_id={props.match.params.deck_id}/>
                        }}/>
                        <PrivateRoute path="/deck/:deck_id/" exact auth={this.props.user.jwt} render={(props) => {
                            return <DeckPage deck_id={props.match.params.deck_id}/>
                        }}/>
                        <PrivateRoute path="/card/:card_id/:details?" auth={this.props.user.jwt} render={(props) => {
                            return (<CardPage 
                                card_id={props.match.params.card_id}
                                details={props.match.params.details}
                            />); 
                        }}/>
                        <PrivateRoute path="/translation/:translation_id/" exact auth={this.props.user.jwt} render={(props) => {
                            return <TranslationPage translation_id={props.match.params.translation_id}/>
                        }}/>
                        <PrivateRoute path="/settings" exact auth={this.props.user.jwt} render={() => <SettingsPage/>} />
                        <Route path="/feedback" exact auth={this.props.user.jwt} render={() => <FeedbackPage/>} />
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
                <div className="notifications">
                    <NotificationProvider/>
                </div>
                <div className="footer">
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