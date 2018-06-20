// TODO: add support for markdown in notes area
import React from 'react'; 
import { PropTypes } from 'prop-types'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux';


import { cardPageSelector } from './selectors';

import {
    addUserNote, 
    updateUserNote
} from 'collections/notes/actions'; 

// Design
import CardDetails from 'components/CardDetails'; 

import './styles.css'; 

const DEFAULT_DETAILS_SELECTION = 1; 

class CardPage extends React.Component {


    getCard() {
        const card = this.props.cards.reduce((foundCard, card) => {
            if(!foundCard && card._id === this.props.card_id) {
                return card; 
            } 
            return foundCard; 
        }, null);

        return card; 
    }

    getNote() {
        // TODO: consider updating the selector to be more like the StudyDeck page 
        // i.e. note is mapped to card._id
        const note = this.props.notes.reduce((foundNote, note) => {
            if(note.card === this.props.card_id) {
                return note; 
            }
            return foundNote; 
        }, {
            note: '', 
            card_id: this.props.card_id,
            card_score: 0
        });

        return note; 
    }

    render() {

        const card = this.getCard(this.props.card); 
        const note = this.getNote(this.props.notes);
        
        const detailsSelection = this.props.details ? 
            Number(this.props.details) : DEFAULT_DETAILS_SELECTION;  

        if(!card) {
            return (<h4>Sorry, no card was found</h4>);
        }

        return (
            <div className="cardContainer">
                <h4>Card Front:</h4>
                <h1>{card.front_text}</h1>
                <br/>
                <h4>Card Back:</h4>
                <h1>{card.back_text}</h1>
                <CardDetails 
                    card={card} 
                    note={note}
                    value={detailsSelection}
                />

            </div>
        );
    }
}

CardPage.propTypes = {
    card_id: PropTypes.string.isRequired
}

const mapStateToProps = cardPageSelector();
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
)(CardPage); 