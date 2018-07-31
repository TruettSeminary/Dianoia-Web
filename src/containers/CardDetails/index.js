import React from 'react'; 
import { PropTypes } from 'prop-types'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux';

import {
    addOrUpdateUserNote
} from 'collections/cards/notes/actions'; 

import {
    cardDetailsSelector
} from './selector'; 


// Design
import AppBar from 'material-ui/AppBar';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

import ReactMarkdown from 'react-markdown'; 

import NoteEditor from 'components/NoteEditor'; 

import {
    Info,
    Note,
    DirectionsWalk,
    Photo,
    LocalMovies
} from '@material-ui/icons';

import './styles.css'; 

function TabContainer(props) {
    return (
        <div className="tabContainer">
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class CardDetails extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            selectedDetail : this.props.selectedDetail
        }
    }

    handlChange = (event, value) => {
        this.setState({
            selectedDetail: value
        })
    }

    // TODO: update to use shouldComponentUpdate
    componentWillUpdate(prevProps) {
        if(prevProps.card._id !== this.props.card._id) {
            // we have a new card
            this.setState({
                selectedDetail: this.props.selectedDetail
            })
        }
    }
 
    render() {
        const { selectedDetail } = this.state; 
        const card  = this.props.cards[this.props.card._id]; 

        return (
            <div className="cardDetails">
                <AppBar position="static">
                    <Tabs value={selectedDetail}
                            fullWidth
                            classes={{root: 'tabsRoot'}}
                            onChange={this.handlChange} scrollable scrollButtons="off"
                            >
                        <Tab icon={<Info />} /> 
                        <Tab icon={<Note />} /> 
                        {card.devotional && <Tab icon={<DirectionsWalk />} />} 
                        {card.images.length && <Tab icon={<Photo />} />}
                        {card.video_link && <Tab icon={<LocalMovies />} />} 
                    </Tabs>
                </AppBar>
                {selectedDetail === 0 && <TabContainer>
                    { card.part_of_speech ? <h4>Part of speech: {card.part_of_speech}</h4> : ''}
                    { card.number_of_occurances ? <h4>Number of occurances: {card.number_of_occurances}</h4> : ''}
                    { card.noted_scripture ? <h4>Noted Scripture: {card.noted_scripture}</h4> : ''}
                </TabContainer>}
                {selectedDetail === 1 && <TabContainer>
                    <NoteEditor
                        note={card.note}
                        addOrUpdateUserNote={this.props.addOrUpdateUserNote}
                    />
                </TabContainer>}
                {selectedDetail === 2 && <TabContainer>
                    <ReactMarkdown source={card.devotional}/>
                </TabContainer>}
                {selectedDetail === 3 && <TabContainer>
                    An image
                    </TabContainer>}
                {selectedDetail === 4 && <TabContainer>
                    A Video
                </TabContainer>}
            </div>

        ); 
    }
}

CardDetails.propTypes = {
    card: PropTypes.object.isRequired,
    selectedDetail: PropTypes.any
}

const mapStateToProps = cardDetailsSelector(); 

const mapDispatchToProps = (dispatch) => {
    return {
        addOrUpdateUserNote: (note) => {
            dispatch(addOrUpdateUserNote(note));
        },
        dispatch
    }
}; 

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(CardDetails); 