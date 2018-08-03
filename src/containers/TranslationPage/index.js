import React from 'react'; 
// import { compose } from 'redux'; 
// import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

class TranslationPage extends React.Component {

    render() {
        return(
            <div>
                {this.props.translation_id}
            </div>
        );
    }

}

TranslationPage.propTypes = {
    translation_id: PropTypes.string.isRequired
}

export default TranslationPage; 