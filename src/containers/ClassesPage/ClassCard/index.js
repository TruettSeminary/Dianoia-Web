import React from 'react';
import PropTypes from 'prop-types'; 

// Design
import Button from 'md-components/CustomButtons/Button'; 
import Card from "md-components/Card/Card.jsx";
import CardHeader from 'md-components/Card/CardHeader.jsx'; 
import CardBody from "md-components/Card/CardBody.jsx";

import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 

import Add from '@material-ui/icons/Add'; 
import Remove from '@material-ui/icons/Remove'; 

// Styles
import styles from './styles'; 


class ClassCard extends React.Component {

    generateDeck(deck, userInDeck) {
        const getIcon = () => {
            if(userInDeck) return (<Remove/>); 
            else return (<Add/>);
        }
        return (
            <div>
                <span>{deck.name}</span>
                <span>
                    <Button 
                        onClick={() => {
                            if(userInDeck) {
                                this.props.removeDeck(deck._id); 
                            }
                            else {
                                this.props.addDeck(deck._id); 
                            }
                        }}
                        style={{padding: '5px', margin: '0px'}}
                        justIcon 
                        simple 
                        color="primary">
                            {getIcon()}
                    </Button>
                </span>
            </div>
        );
    }

    generateDecks(decks, userInDeck) {
        return decks.map((deck) =>{
            return (<GridItem key={deck._id}
                xs={6} sm={6} md={4}>
                {this.generateDeck(deck, userInDeck)} 
            </GridItem>);
            
        })
    }

    render() {

        let userDecks = [];
        let otherDecks = []; 

        this.props.clazz.decks.forEach((deck) => {
            if(this.props.userDecks.includes(`${deck._id}`)) {
                userDecks.push(deck); 
            }
            else {
                otherDecks.push(deck); 
            }
        }); 

        return (
            <div>
                <Card>
                    <CardHeader color="info">
                        <GridContainer>
                            <GridItem xs={6} sm={6} md={8}>
                                <h4 style={styles.name}>{this.props.clazz.name}</h4>
                            </GridItem>
                            <GridItem xs={3} sm={3} md={3}>
                                <Button
                                    color={this.props.userInClass ? 'warning' : 'rose'}
                                    onClick={() => this.props.classAction(this.props.clazz._id)}
                                >
                                    {this.props.userInClass ? 'Leave' : 'Join'}
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12}>
                                <p>{this.props.clazz.description}</p>
                            </GridItem>
                            <GridItem xs={12}>
                                <h4>Your Decks</h4>
                            </GridItem>
                            <GridItem xs={12}>
                                <GridContainer spacing={8}>
                                    {this.generateDecks(userDecks, true)}
                                </GridContainer>
                            </GridItem>
                            <GridItem xs={12}>
                                <h4>Other Available Decks</h4>
                            </GridItem>
                            <GridItem xs={12}>
                            <GridContainer spacing={8}>
                                    {this.generateDecks(otherDecks, false)}
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                        
                        
                    </CardBody>
                </Card>
                
            </div>
        );
    }
}

ClassCard.propTypes = {
    clazz: PropTypes.object.isRequired,
    userInClass: PropTypes.bool.isRequired, 
    classAction: PropTypes.func.isRequired,
    userDecks: PropTypes.array.isRequired, 
    addDeck: PropTypes.func.isRequired, 
    removeDeck: PropTypes.func.isRequired
}

export default ClassCard