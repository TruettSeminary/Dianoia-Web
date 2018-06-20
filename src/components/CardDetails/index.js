import React from 'react'; 
import { PropTypes } from 'prop-types'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux';

import {
    addUserNote, 
    updateUserNote
} from 'collections/notes/actions'; 


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
            value : this.props.value
        }
    }

    handlChange = (event, value) => {
        this.setState({
            value
        })
    }

    componentWillUpdate(prevProps, prevState) {
        if(prevProps.card._id !== this.props.card._id) {
            // we have a new card
            this.setState({
                value: this.props.value
            })
        }
    }
 
    render() {
        const { value } = this.state; 
        const { card, note } = this.props;
        return (
            <div className="cardDetails">
                <AppBar position="static">
                    <Tabs value={value}
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
                {value === 0 && <TabContainer>
                    { card.part_of_speech ? <h4>Part of speech: {card.part_of_speech}</h4> : ''}
                    { card.number_of_occurances ? <h4>Number of occurances: {card.number_of_occurances}</h4> : ''}
                    { card.noted_scripture ? <h4>Noted Scripture: {card.noted_scripture}</h4> : ''}
                </TabContainer>}
                {value === 1 && <TabContainer>
                    <NoteEditor
                        note={note}
                        addUserNote={this.props.addUserNote}
                        updateUserNote={this.props.updateUserNote}
                    />
                </TabContainer>}
                {value === 2 && <TabContainer>
                    <ReactMarkdown source={card.devotional}/>
                </TabContainer>}
                {value === 3 && <TabContainer>
                    An image
                    </TabContainer>}
                {value === 4 && <TabContainer>
                    A Video
                </TabContainer>}
            </div>

        ); 
    }
}

CardDetails.propTypes = {
    card: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired, 
    value: PropTypes.any
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserNote: (note) => {
            dispatch(addUserNote(note));
        },
        updateUserNote: (note) => {
            dispatch(updateUserNote(note)); 
        },
        dispatch
    }
}; 

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(CardDetails); 