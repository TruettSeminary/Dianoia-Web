// TODO: add information about how often a deck has been studied
import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 

import { push } from 'connected-react-router'

import { homePageSelector } from './selectors'

import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 

import HomeCard from './HomeCard'; 

import './styles.css'; 

class HomePage extends React.Component {


    generateDecks() {
        return this.props.decks.map((deck) => {
            return (
            <GridItem 
                xs={12} sm={6} md={4} lg={3} xl={2}
                key={deck._id}>
                <HomeCard 
                    deck={deck}
                    studyDeck={() => {
                        this.props.pushPage(`/deck/study/${deck._id}`)
                    }} 
                />
            </GridItem>); 
        }); 
    }

    render() {
        return (
            <div className="homePageContainer">
                <h1>Your Decks</h1>
                <GridContainer>
                    {this.generateDecks()}
                </GridContainer>
            </div>
        );
    }
}

const mapStateToProps = homePageSelector(); 
const mapDispatchToProps = (dispatch) => {
    return {
        pushPage: (route) =>  {
            dispatch(push(route)); 
        },  
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose( 
    withConnect
)(HomePage); 