import React from 'react';
import PropTypes from 'prop-types'; 

import Card from "md-components/Card/Card.jsx";
import CardBody from "md-components/Card/CardBody.jsx";

import './styles.css'; 

class TranslationDeckCard extends React.Component {

    render() {
        return (
            <div>
                <Card className="translationDeckCard">
                    <CardBody
                        onClick={() => this.props.openTranslation()}
                    >
                        <h5>{this.props.translation.name}</h5>
                        <p>{this.props.translation.sentence}</p>
                    </CardBody>
                </Card>
            </div>
        ); 
    }

}

TranslationDeckCard.propTypes = {
    translation: PropTypes.object.isRequired, 
    openTranslation: PropTypes.func.isRequired
}; 


export default TranslationDeckCard