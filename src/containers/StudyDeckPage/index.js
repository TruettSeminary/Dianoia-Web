import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
// import { PropTypes } from 'prop-types'; 

import { studyDeckPageSelector } from './selectors'; 

import {
    addUserNote, 
    updateUserNote
} from 'collections/notes/actions'; 

import { CardQueue } from './CardQueue'; 

// Design
// import GridContainer from 'md-components/Grid/GridContainer'; 
// import GridItem from 'md-components/Grid/GridItem'; 
// import Button from 'md-components/CustomButtons/Button';


import StudyCard from './StudyCard';
import CardDetails from 'components/CardDetails'; 

import './styles.css'; 

class StudyDeckPage extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            cardQueue: this.getCardQueue()
        }
    }

    componentWillUpdate(prevProps) {
        // TODO: 
        // - create new queue
        // compare with current queue
        // update current queue (without replacing top (current) card so user does not recognize the change)
    }

    getCardQueue() {
        // TODO: add queue here?
        return this.props.cards.reduce((cardQueue, card) => {
            if(card.decks.includes(this.props.deck_id)) {
                cardQueue.insert(card); 
            }

            return cardQueue; 
        }, new CardQueue()); 
    }

    generateCards() {
        // TODO: add priority queue support for card score
        return this.state.cardQueue.getQueue().map((card) => {
            return (
                <StudyCard 
                    key={card._id}
                    card={card}
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
        // TODO: determine how to adjust card score in this process


        const cardQueue = this.state.cardQueue; 
        const topCard = cardQueue.poll(); 

        cardQueue.insert(topCard); 
        this.setState({
            cardQueue
        })
    }

    generateCardDetails() {
        // TODO: update note here to work with card scoreing in the rest of the page
        const card = this.state.cardQueue.peek(); 
        if(!card) return (<h4>Retrieving cards</h4>);

        let note = this.props.notes[card._id]; 
        if(!note) {
            note = {
                card_id: card._id,
                note: '',
                cardScore : 0
            }
        }
        return (<CardDetails 
            card={card} 
            note={note}
            value={false}
        />);
    }

    render() {

        return (
            <div className="studyContainer">
                <div className='cardContainer'>
                    <div className='studyList'>
                        {this.generateCards()}
                    </div>
                </div>
                <div className="cardDetails">
                    {/* // TODO: put card details to the right/left of the cards on a wider screen
                    // TODO: adjust card size on larger screen */}
                    {this.generateCardDetails()}
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