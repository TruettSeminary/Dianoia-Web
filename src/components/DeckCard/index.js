import React from 'react';
import PropTypes from 'prop-types'; 

import Card from "md-components/Card/Card.jsx";
import CardBody from "md-components/Card/CardBody.jsx";
import CustomLinearProgress from "md-components/CustomLinearProgress/CustomLinearProgress.jsx";

import './styles.css'; 

class DeckCard extends React.Component {

    render() {
        return (
            <div>
                <Card className="card">
                    <CardBody
                        onClick={() => this.props.editCard()}
                    >
                        <p className="card_text">{this.props.front_text}</p>
                        <CustomLinearProgress
                            variant="determinate"
                            value={100}
                        />
                        <p className="card_text">{this.props.back_text}</p>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

DeckCard.propTypes = {
    front_text: PropTypes.string.isRequired, 
    back_text: PropTypes.string.isRequired,
    editCard: PropTypes.func.isRequired
}; 

export default DeckCard; 