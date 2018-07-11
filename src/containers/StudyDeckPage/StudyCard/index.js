import React from 'react'; 
import { PropTypes } from 'prop-types'; 

import Card from "md-components/Card/Card.jsx";
import CardBody from "md-components/Card/CardBody.jsx";
import CardFooter from 'md-components/Card/CardFooter.jsx'; 

import AudioPlayer from 'components/AudioPlayer'; 

import Hammer from 'react-hammerjs'; 

import './styles.css'; 

class StudyCard extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            flipped : false
        }
    }

    swipeUp() {
        console.log('swipeUp');
        this.props.onCorrectDismiss(); 
        this.setFlip(false); 
    }

    swipeDown() {
        console.log('swipeDown');
        this.props.onIncorrectDismiss();
        this.setFlip(false); 
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
                    onTap={(event) => {
                        // prevent card flip when clicking audio button
                        if(!["svg", "path", "BUTTON"].includes(event.target.nodeName)) {
                            this.flipCard();
                        }
                    }}
                    onSwipeUp={() => {
                        this.swipeUp();
                    }}
                    onSwipeDown={() =>{
                        this.swipeDown();
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
                            <CardFooter className="studyCardFooter">
                                {this.props.card.pronunciation ? (<AudioPlayer audioSource={this.props.card.pronunciation.url} />) : ''}
                            </CardFooter>
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
    onCorrectDismiss: PropTypes.func,
    onIncorrectDismiss: PropTypes.func
}

export default StudyCard; 