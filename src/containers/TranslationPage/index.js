import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

import { translationPageSelector } from './selectors'; 

import InteractiveSegment from './InteractiveSegment'; 

import "./styles.css";


class TranslationPage extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            translation: this.props.translations[this.props.translation_id]
        }
    }

    generateTranslation() {
        return Object.values(this.state.translation.metadata.segments).sort((segmentA, segmentB) => {
            return segmentA.index - segmentB.index
        }).map((segment) => {
            return (<InteractiveSegment key={segment.id} segment={segment} cards={this.props.cards}/>);
        }); 
    }

    render() {
        return(
            <div className="translationPageContainer">
                <h3>{this.state.translation.name}</h3>
                <p>Type your translation below. Double tap on words for hints</p>
                {this.state.translation.instructions && 
                    <p>Extra instructions: {this.state.translation.instructions}</p>}
                <div className="translationContainer">
                    {this.generateTranslation()}
                </div>
            </div>
        );
    }

}

TranslationPage.propTypes = {
    translation_id: PropTypes.string.isRequired
}

const mapStateToProps = translationPageSelector(); 

const mapDispatchToProps = (dispatch) =>  {
    return {
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(TranslationPage);