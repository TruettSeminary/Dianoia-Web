import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

import { push } from 'connected-react-router'

import { deckPageSelector } from './selectors'

// Design
import Button from 'md-components/CustomButtons/Button'; 
import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 

import DeckCard from 'components/DeckCard'; 

import './styles.css'; 

class DeckPage extends React.Component {

    generateCards(cards) {
        if(cards.length) {
            return cards.map((card) => {
                return (
                    <GridItem key={card._id}
                        xs={6} sm={6} md={4} lg={3} xl={2}
                    >
                        <DeckCard {...card} 
                            editCard={() => {
                                this.props.pushPage(`/card/${card._id}`)
                            }}
                        />
                    </GridItem>
                ); 
            }); 
        }
        else return (<h5>This deck does not have any cards.</h5>)
    }

    render() {
        const cards = this.props.cards.filter((card)  => {
            return card.decks.includes(this.props.deck_id); 
        }); 

        const deck = this.props.decks.reduce((foundDeck, deck) => {
            if(!foundDeck && deck._id === this.props.deck_id) {
                foundDeck = deck; 
            }
            return foundDeck; 
        }, null); 

        return (
            <div className="deckContainer">
                <h2>Deck: {deck.name}</h2>
                <Button
                    color='info'
                    size='lg'
                    onClick={() => {
                        this.props.pushPage(`/deck/study/${this.props.deck_id}`)
                    }}
                >
                    Study
                </Button>
                <h4>Tap on a card to edit it</h4>
                <GridContainer spacing={8}>
                    {this.generateCards(cards)}
                </GridContainer>
            </div>
        );
    }
}

DeckPage.propTypes = {
    deck_id: PropTypes.string.isRequired
}

const mapStateToProps = deckPageSelector(); 
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
)(DeckPage); 