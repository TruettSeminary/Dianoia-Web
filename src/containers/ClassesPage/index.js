import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 

import { classesPageSelector } from './selectors'; 


import {
    getAllClasses,
    addClassToUser, 
    removeClassFromUser
} from 'collections/classes/actions'; 

import {
    addDeckToUser, 
    removeDeckFromUser
} from 'collections/decks/actions'

// Design
import ClassCard from './ClassCard'; 
import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 

import './styles.css'; 

class ClassesPage extends React.Component {

    generateClass(clazz, userInClass) {
        return (
            <ClassCard
                key={clazz._id}
                clazz={clazz}
                userInClass={userInClass}
                userDecks={this.props.user.decks}
                classAction={() => {
                    if(userInClass) {
                        this.props.removeClassFromUser(this.props.user, clazz._id)
                    }
                    else {
                        this.props.addClassToUser(this.props.user, clazz._id); 
                    }
                }}
                addDeck={(deck_id) => {
                    this.props.addDeckToUser(this.props.user, deck_id); 
                }}
                removeDeck={(deck_id) => {
                    this.props.removeDeckFromUser(this.props.user, deck_id); 
                }}
            />
        ); 
    }

    generateClasses(classes, userInClass) {
        if(classes.length) {
            return classes.map((clazz) => {
                return (
                    <GridItem key={clazz._id} 
                        xs={12} sm={6} md={6} lg={4} xl={3}>
                        {this.generateClass(clazz, userInClass)}
                    </GridItem>
                );
            });   
        }
        else return (<h5>No classes available</h5>);
    }

    render() {
        // TODO: sort classes in alpha order
        let userClasses = []; 
        let otherClasses = []; 
        this.props.classes.forEach((clazz) =>  {
            if(this.props.user.classes.includes(`${clazz._id}`)) {
                userClasses.push(clazz);
            } 
            else otherClasses.push(clazz); 
        }); 

        return (
            <div className="classContainer">
                <h2>Your Classes</h2>
                <GridContainer>
                    {this.generateClasses(userClasses, true)}
                </GridContainer>
                
                <h2>Other Classes</h2>
                <GridContainer>
                    {this.generateClasses(otherClasses, false)}
                </GridContainer>
            </div>
        );
    }
}

const mapStateToProps = classesPageSelector(); 

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => { 
            dispatch(getAllClasses())
        },
        addClassToUser: (user, class_id) => { 
            dispatch(addClassToUser(user, class_id));
        },
        removeClassFromUser: (user, class_id) => { 
            dispatch(removeClassFromUser(user, class_id));
        },
        addDeckToUser: (user, deck_id) => {
            dispatch(addDeckToUser(user, deck_id)); 
        }, 
        removeDeckFromUser: (user, deck_id) => {
            dispatch(removeDeckFromUser(user, deck_id));
        },
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(ClassesPage); 