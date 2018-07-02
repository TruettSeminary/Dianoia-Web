import React from 'react'; 
import { PropTypes } from 'prop-types'; 

import Card from "md-components/Card/Card.jsx";
import CardBody from "md-components/Card/CardBody.jsx";

import Hammer from 'react-hammerjs'; 

import './styles.css'; 

class StudyCard extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            flipped : false
        }
    }

    setFlip(val) {
        this.setState({
            flipped: val
        });
    }

    flipCard() {
        this.setFlip(!this.state.flipped);
    }

    render() {

        return(
            <div className='studyCardContainer'>
                <Hammer
                    direction="DIRECTION_ALL"
                    onTap={() => {this.flipCard()}}
                    onSwipe={() => {
                        this.props.onSwipe();
                        this.setFlip(false); 
                    }}
                    onDoubleTap={() => { 
                        this.props.onDoubleTap()
                        this.setFlip(false); 
                    }}
                    >
                    <div 
                    className={`hammerContainer ${this.state.flipped ? 'flipped' : ''}`}>
                        <Card className='studyCard front'>
                            <CardBody className="studyCardBody" >
                                <div className='cardText'>
                                    {this.props.card.front_text}
                                </div>
                            </CardBody>
                        </Card>

                        <Card className='studyCard back'>
                            <CardBody className="studyCardBody">
                                <div className='cardText'>
                                    {this.props.card.back_text}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Hammer>
            </div>
        ); 
    }
}

StudyCard.propTypes = {
    card: PropTypes.object.isRequired, 
    onDoubleTap: PropTypes.func,
    onSwipe: PropTypes.func
}

export default StudyCard; 