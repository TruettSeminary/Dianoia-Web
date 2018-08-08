import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

import { translationPageSelector } from './selectors'; 

import CustomInput from "md-components/CustomInput/CustomInput.jsx";
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
                <p>Type your translation below. Double tap on words for hints.</p>
                {this.state.translation.instructions && 
                    <p>Extra instructions: {this.state.translation.instructions}</p>}
                <p>Note: Your translation will not be saved. This is purely for your own practice.</p>
                <div className="translationContainer">
                    {this.generateTranslation()}
                </div>
                <div>
                    <CustomInput 
                        labelText="Enter your translation here"
                        id="userTranslations"
                        inputProps={{
                            multiline: true,
                            classes: {
                                root: 'input'
                            },
                        }}
                        formControlProps = {{
                            fullWidth: true
                        }}
                    />
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