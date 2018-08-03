import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

import Hammer from 'react-hammerjs'; 
import Popover from 'material-ui/Popover/Popover'; 
import withStyles from 'material-ui/styles/withStyles'; 

import { addOrUpdateUserNote } from 'collections/cards/notes/actions'; 
import popoverStyles from "assets/jss/material-kit-react/popoverStyles.jsx";


class InteractiveSegment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        }
    }

    handleDoubleTap(event) {
        console.log(event.target);
        this.setState({
            anchorEl: event.target
        })
    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    render() {
        const segment = this.props.segment; 

        return(<span className="phraseContainer">
            <Hammer 
                options={{
                    recognizers: {
                        tap: {
                            time: 600,
                            threshold: 100
                        }
                    }
                }}
            onDoubleTap={(event) => this.handleDoubleTap(event)}>
                <span >
                    {`${segment.phrase}   `}
                </span>
            </Hammer>
            <Popover
                classes={{
                    paper: this.props.classes.popover
                }}
                open={Boolean(this.state.anchorEl)}
                anchorEl={this.state.anchorEl}
                onClose={() => this.handleClose()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                popover
            </Popover>
        </span>); 
    }

}

InteractiveSegment.propTypes = {
    segment: PropTypes.object.isRequired
}


const mapDispatchToProps = (dispatch) =>  {
    return {
        addOrUpdateUserNote: (note) => {
            dispatch(addOrUpdateUserNote(note))
        },
        dispatch
    }
}

const withConnect = connect(null, mapDispatchToProps); 

export default compose(
    withStyles(popoverStyles),
    withConnect
)(InteractiveSegment);