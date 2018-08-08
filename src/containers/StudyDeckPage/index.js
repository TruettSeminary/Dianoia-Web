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

    componentDidUpdate(prevProps) {
        if(prevProps.deck_id !== this.props.deck_id) {
            this.setState(this.getCardState()); 
        }
    }

    getCardQueue(cards) {
        return new CardQueue(cards, QUEUE_STRATEGY.PRIORITY); 
    }

    dismissTopCard(isCorrect) {
        const cardQueue = this.state.cardQueue; 
        const topCard = cardQueue.poll(); 
         
        if(isCorrect) topCard.note.card_score += 3; 
        else topCard.note.card_score += 1; 

        this.props.addOrUpdateUserNote(topCard.note); 

        cardQueue.insert(topCard); 
    }


    render() {

        if(!this.state.cards.length) {
            return (
                <div className="studyContainer">
                        <h2 className="emptyDeckWarning">This deck has no cards in it!</h2>
                </div>);
        }

        const topCard = this.state.cardQueue.peek(); 

        return (
            <div className="studyContainer">
                <div className='cardContainer'>
                    <Hidden mdUp>
                        <p className="instructions">Swipe right for a card you do not know. Swipe left for a card you do know.</p>
                    </Hidden>
                    <div className='studyList'>
                        {topCard && 
                            <StudyCard
                                card={topCard}
                                onCorrectDismiss={
                                    () => this.dismissTopCard(true)
                                } 
                                onIncorrectDismiss={
                                    () => this.dismissTopCard(false)
                                }
                            />
                        }
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
                    {topCard ? (
                        <CardDetails 
                            card={topCard}
                            selectedDetail={false}
                        />
                    ) : (
                        <h4>No card selected</h4>
                    ) }
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