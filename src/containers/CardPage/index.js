import React from 'react'; 
import { PropTypes } from 'prop-types'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux';


import { cardPageSelector } from './selectors';

// Design
import CardDetails from 'containers/CardDetails'; 

import './styles.css'; 

const DEFAULT_DETAILS_SELECTION = 1; 

class CardPage extends React.Component {

    render() {

        const card = this.props.cards[this.props.card_id]; 
        
        const detailsSelection = this.props.details ? 
            Number(this.props.details) : DEFAULT_DETAILS_SELECTION;  

        if(!card) {
            return (<h4>Sorry, no card was found</h4>);
        }

        return (
            <div className="cardPageContainer">
                <h4>Card Front:</h4>
                <h1>{card.front_text}</h1>
                <br/>
                <h4>Card Back:</h4>
                <h1>{card.back_text}</h1>
                <CardDetails 
                    card={card}
                    selectedDetail={detailsSelection}
                />

            </div>
        );
    }
}

CardPage.propTypes = {
    card_id: PropTypes.string.isRequired
}

const mapStateToProps = cardPageSelector();

// TODO: remove these dispatch functions if they are not used
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}; 

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(CardPage); 