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
            slideDirection: 'none',
            flipped : false
        }
    }

    hapticFeedback() {
        const FEEDBACK_LENGTH = 25; 

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate) {
            console.log(navigator.vibrate([FEEDBACK_LENGTH])); 
        }
        
    }

    swipeRight() {
        this.hapticFeedback(); 

        this.setState({
            slideDirection: 'slide-right'
        });

        setTimeout(() => {
            this.setState({
                flipped: false,
                slideDirection: 'none'
            }, () => {
                // Temp fix to handle asynchronous nature of setState
                // Better way would be to refactor state and move it up a level
                setTimeout(() => this.props.onIncorrectDismiss(), 250); 
            })
        }, 250)
        
    }

    swipeLeft() {
        this.hapticFeedback(); 

        this.setState({
            slideDirection: 'slide-left'
        });

        setTimeout(() => {
            this.setState({
                flipped: false,
                slideDirection: 'none'
            }, () => {
                // Temp fix to handle asynchronous nature of setState
                // Better way would be to refactor state and move it up a level 
                setTimeout(() => this.props.onCorrectDismiss(), 250); 
            })
        }, 250)
    }

    flipCard() {
        this.setState({
            flipped: !this.state.flipped
        })
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
                    onSwipeRight={() => {
                        this.swipeRight();
                    }}
                    onSwipeLeft={() =>{
                        this.swipeLeft();
                    }}
                >
                    <div 
                    className={`hammerContainer ${this.state.slideDirection} ${this.state.flipped ? 'flipped' : ''}`}>
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
                            <CardFooter className="studyCardFooter">
                            </CardFooter>
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