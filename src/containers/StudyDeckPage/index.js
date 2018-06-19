import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
// import { PropTypes } from 'prop-types'; 

import { studyDeckPageSelector } from './selectors'; 

import {
    addUserNote, 
    updateUserNote
} from 'collections/notes/actions'; 

// Design
// import GridContainer from 'md-components/Grid/GridContainer'; 
// import GridItem from 'md-components/Grid/GridItem'; 
import StudyCard from 'components/StudyCard'

import './styles.css'; 

class StudyDeckPage extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            displayCards: this.generateCards()
        }
    }

    generateCards() {
        // TODO: add priority queue support for card score
        return Object.keys(this.props.cards).map((card, index, arr) => {
            const studyCard = this.props.cards[card]; 
            return (
                <StudyCard 
                    key={studyCard._id}
                    card={studyCard}
                    onSwipe={
                        () => this.dismissTopCard(true)
                    } 
                    onDoubleTap={
                        () => this.dismissTopCard(false)
                    }
                />
            );
        });
    }

    dismissTopCard(correct) {
        const displayCards = this.state.displayCards; 
        const topCard = displayCards.shift(); 
        displayCards.push(topCard); 
        this.setState({
            displayCards
        })
    }

    render() {

        return (
            <div className='studyContainer'>
                <div className='studyList'>
                    {this.state.displayCards}
                </div>
            </div>
        );
    }
}

StudyDeckPage.propTypes = {}

const mapStateToProps = studyDeckPageSelector(); 

const mapDispatchToProps = (dispatch) => {
    return {
        addUserNote: (note) => {
            dispatch(addUserNote(note));
        },
        updateUserNote: (note) => {
            dispatch(updateUserNote(note)); 
        },
        dispatch
    }
}; 

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(StudyDeckPage); 