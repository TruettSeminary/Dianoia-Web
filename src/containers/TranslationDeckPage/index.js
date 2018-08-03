import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

import { push } from 'connected-react-router'

import { translationDeckPageSelector } from './selectors'; 

import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 

import TranslationDeckCard from './TranslationDeckCard'; 

import './styles.css'; 

class TranslationDeckPage extends React.Component {


    generateTranslationCards(translations) {
        if(translations.length) {
            return translations.map((translation) => {
                return (
                    <GridItem key={translation._id}
                        xs={6} sm={6} md={4} lg={3} xl={2}
                    >
                        <TranslationDeckCard
                            translation={translation} 
                            openTranslation={() => {
                                this.props.pushPage(`/translation/${translation._id}`)
                            }}
                        />
                    </GridItem>
                ); 
            }); 
        }
        else return (<h5>This deck does not have any translations to practice</h5>)
    }

    render() {
        const deck = this.props.decks[this.props.deck_id]; 

        // TODO: get better error message
        if(!deck) return (<h4> No deck this this id found</h4>); 

        const translations = deck.translations.map((translation_id) => {
            return this.props.translations[translation_id]; 
        }); 

        return (
            <div className="translationDeckPageContainer">
                <h2>Deck: {deck.name}</h2>
                <GridContainer spacing={8}>
                    {this.generateTranslationCards(translations)}
                </GridContainer>
            </div>
        );
    }
}

TranslationDeckPage.propTypes = {
    deck_id: PropTypes.string.isRequired
}

const mapStateToProps = translationDeckPageSelector(); 
const mapDispatchToProps = (dispatch) => {
    return {
        pushPage: (route) =>  {
            dispatch(push(route)); 
        },  
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose( 
    withConnect
)(TranslationDeckPage); 