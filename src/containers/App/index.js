// React/Redux
import React from 'react'; 
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom'; 
import { compose } from 'redux'; // bindActionCreators

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

// Design
import Toolbar from 'containers/Toolbar';
import Footer from 'components/Footer'; 
import NotificationProvider from 'containers/NotificationProvider'


// Styles
import styles from './styles.js'; 

class App extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.toolbar}>
                    <Toolbar />
                </div>
                <div style={styles.content}>
                    <Switch>
                        <Route path="/" exact render={() => <LandingPage/>} />
                        <Route path="/home" exact render={() => <HomePage {...this.props}/>} />
                        <Route path="/classes" exact render={() => <ClassesPage/>} />
                        <Route path="/deck/study/:deck_id" exact render={(props) => {
                            return <StudyDeckPage deck_id={props.match.params.deck_id}/>
                        }}/>
                        <Route path="/deck/:deck_id" exact render={(props) => {
                            return <DeckPage deck_id={props.match.params.deck_id}/>
                        }}/>
                        <Route path="/card/:card_id" exact render={(props) => {
                            return <CardPage card_id={props.match.params.card_id}/>
                        }}/>
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


export default compose(
    withRouter
)(App); 