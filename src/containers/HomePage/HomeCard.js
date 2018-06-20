import React from 'react'; 
import PropTypes from 'prop-types'; 

import Card from "md-components/Card/Card.jsx";
import CardBody from "md-components/Card/CardBody.jsx";

import './styles.css'; 

class HomeCard extends React.Component {

    render() {
        return(
            <div className="homeCard" onClick={() => this.props.studyDeck()}>
                <Card>
                    <CardBody>
                        <h3>{this.props.deck.name}</h3>
                        <h4>{this.props.deck.description}</h4>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

HomeCard.propTypes = {
    deck: PropTypes.object.isRequired,
    studyDeck: PropTypes.func.isRequired
}

export default HomeCard;