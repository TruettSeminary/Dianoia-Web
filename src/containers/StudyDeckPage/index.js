import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
// import { PropTypes } from 'prop-types'; 

import { studyDeckPageSelector } from './selectors'; 

import {
    addUserNote, 
    updateUserNote
} from 'collections/notes/actions'; 

import { 
    CardQueue,
    QUEUE_STRATEGY 
} from './CardQueue/CardQueue'; 

// Design
// import GridContainer from 'md-components/Grid/GridContainer'; 
// import GridItem from 'md-components/Grid/GridItem'; 
import Button from 'md-components/CustomButtons/Button';
import Hidden from "material-ui/Hidden";

// @material-ui/icons
import {
    ThumbDown,
    ThumbUp
  } from "@material-ui/icons";
  
import StudyCard from './StudyCard';
import CardDetails from 'components/CardDetails'; 

import './styles.css'; 

class StudyDeckPage extends React.Component {

    constructor (props) {
        super(props);

        this.init = () => {
            const cards = this.props.cards.reduce((cards, card) => {
                if(card.decks.includes(this.props.deck_id)) {
                    if(!card.note) card.note = {}; 
                    if(!card.note.card_score) card.note.card_score = 0; 
    
                    cards.push(card); 
                }
    
                return cards; 
            }, []); 

            this.state = {
                cards,
                cardQueue: this.getCardQueue(cards)
            }
        }

        this.init(); 
    }

    // TODO: 
    // - create new queue
    // compare with current queue
    // update current queue (without replacing top (current) card so user does not recognize the change)
    componentDidUpdate(prevProps) {
        if(prevProps.deck_id !== this.props.deck_id) {
            this.init(); 
        }
    }

    getCardQueue(cards) {
        return new CardQueue(cards, QUEUE_STRATEGY.PRIORITY); 
    }

    generateCards() {
        console.log(this.state.cardQueue); 
        // TODO: add priority queue support for card score
        return this.state.cardQueue.getQueue().map((card) => {
            return (
                <StudyCard 
                    key={card._id}
                    card={card}
                    onCorrectDismiss={
                        () => this.dismissTopCard(true)
                    } 
                    onIncorrectDismiss={
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
         
        // TODO make this work with actual card note
        if(correct) topCard.note.card_score += 3; 
        else topCard.note.card_score += 1; 

        cardQueue.insert(topCard); 

        this.setState({})
    }

    generateCardDetails() {
        // TODO: update note here to work with card scoreing in the rest of the page
        const card = this.state.cardQueue.peek(); 
        if(!card) return (<h4>Retrieving cards</h4>);

        let note = card.note; 
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
                <Hidden smDown>
                    <div className="dismissActions">
                        <Button className="actionItem correct" color="info" justIcon round onClick={() => this.dismissTopCard(true)}>
                            <ThumbUp/>
                        </Button>
                        <Button className="actionItem incorrect" color="danger" justIcon round onClick={() => this.dismissTopCard(false)}>
                            <ThumbDown/>
                        </Button>
                    </div>
                </Hidden>
                </div>
                <div className="studyCardDetails">
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