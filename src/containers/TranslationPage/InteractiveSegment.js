import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

import Hammer from 'react-hammerjs'; 
import Popover from 'material-ui/Popover/Popover'
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

        this.props.segment.cards.forEach(({_id}) => {
            const cardNote = this.props.cards[_id].note; 
            cardNote.card_score -= 1; 

            this.props.addOrUpdateUserNote(cardNote); 
        }); 

        this.setState({
            anchorEl: event.target,
            doubleTapTimeStamp: event.timeStamp
        })
    }

    handleClose() {
        // compare against timestamp to avoid "ghost click" issue
        if(this.state.doubleTapTimeStamp + 500 < Date.now()) {
            this.setState({
                anchorEl: null
            });
        }
    }

    render() {
        const segment = this.props.segment; 

        return(<span className="phraseContainer">
            <Hammer 
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
                {segment.translation && <h3 
                    className={this.props.classes.popoverHeader}
                >{segment.translation}</h3>}
                <div className={this.props.classes.popoverBody}>
                    {segment.cards.length ? 'Cards' : ''}:
                    {segment.cards && segment.cards.map(({_id, form}) =>{   
                            const card = this.props.cards[_id]; 
                            return <p key={_id} onClick={() => console.log(card)}>{card.front_text} : {card.back_text}{form && ` --> ${form}`}</p> 
                        })
                    }
                </div>
            </Popover>
        </span>); 
    }

}

InteractiveSegment.propTypes = {
    segment: PropTypes.object.isRequired, 
    cards: PropTypes.object.isRequired
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