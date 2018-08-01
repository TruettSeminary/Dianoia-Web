import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
// import { PropTypes } from 'prop-types'; 

import { studyDeckPageSelector } from './selectors'; 
import { addOrUpdateUserNote } from 'collections/cards/notes/actions'; 

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
import CardDetails from 'containers/CardDetails'; 

import './styles.css'; 

class StudyDeckPage extends React.Component {

    constructor (props) {
        super(props);

        this.getCardState = () => {
            const deck = this.props.decks[this.props.deck_id]; 
            if(!deck) return {}; // We don't have a deck!

            const cards = deck.cards.map((card_id) => {
                return this.props.cards[card_id]; 
            }) 

            return {
                cards, 
                cardQueue: this.getCardQueue(cards)
            }
        }

        this.state = this.getCardState(); 
    }

    // TODO: 
    // - create new queue
    // compare with current queue
    // update current queue (without replacing top (current) card so user does not recognize the change)
    componentDidUpdate(prevProps) {
        if(prevProps.deck_id !== this.props.deck_id) {
            this.setState(this.getCardState()); 
        }
    }

    getCardQueue(cards) {
        return new CardQueue(cards, QUEUE_STRATEGY.PRIORITY); 
    }

    generateCards(cardQueue) {
        // TODO: add priority queue support for card score
        return cardQueue.map((card) => {
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

    dismissTopCard(isCorrect) {
        // TODO: determine how to adjust card score in this process
        const cardQueue = this.state.cardQueue; 
        const topCard = cardQueue.poll(); 
         
        // TODO make this work with actual card note
        if(isCorrect) topCard.note.card_score += 3; 
        else topCard.note.card_score += 1; 

        this.props.addOrUpdateUserNote(topCard.note); 

        cardQueue.insert(topCard); 
        this.setState({});
    }

    generateCardDetails() {
        const card = this.state.cardQueue.peek(); 
        if(!card) return (<h4>Retrieving cards</h4>);

        return (<CardDetails 
            card={card}
            selectedDetail={false}
        />);
    }

    render() {

        return (
            <div className="studyContainer">
                <div className='cardContainer'>
                    <div className='studyList'>
                        {this.generateCards(this.state.cardQueue.getQueue())}
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
        addOrUpdateUserNote: (note) => {
            dispatch(addOrUpdateUserNote(note)); 
        },
        dispatch
    }
}; 

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(StudyDeckPage); 