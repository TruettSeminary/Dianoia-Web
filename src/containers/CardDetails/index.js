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
import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 
import AppBar from 'material-ui/AppBar';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

import ReactMarkdown from 'react-markdown'; 
import Youtube from 'react-youtube'

import NoteEditor from 'components/NoteEditor'; 

import {
    Info,
    Note,
    DirectionsWalk,
    Photo,
    LocalMovies
} from '@material-ui/icons';

import './styles.css'; 

function getYoutubeVideoID(url) {
    // eslint-disable-next-line
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return null; 
    }
}

function TabContainer(props) {
    return (
        <div className={`tabContainer ${props.className}`}>
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

    generateTab(label, icon) {
        return (<Tab 
            label={label} 
            icon={icon}
            classes={{ wrapper: 'tabWrapper' }} 
        />); 
    }
 
    render() {
        const { selectedDetail } = this.state; 
        const card  = this.props.cards[this.props.card._id]; 

        const youtubeID = card.video_link && getYoutubeVideoID(card.video_link); 

        const containerIDs = {
            info: 0,
            notes: 1
        }; 

        let nextID = 2; 
        ['devotional', 'images', 'video_link'].forEach((detail) => {
            if(card[detail] && card[detail].length) {
                containerIDs[detail] = nextID; 
                nextID++; 
            }
        }); 

        return (
            <div className="cardDetails">
                <AppBar position="static">
                    <Tabs value={selectedDetail}
                            fullWidth
                            classes={{root: 'tabsRoot'}}
                            onChange={this.handlChange} scrollable scrollButtons="off"
                            >
                        {this.generateTab("Info", <Info />)}
                        {this.generateTab("Notes", <Note/>)}
                        {card.devotional && this.generateTab("Devotional", <DirectionsWalk/>)}
                        {card.images.length && this.generateTab("Photos", <Photo />)}
                        {card.video_link && this.generateTab("Video", <LocalMovies />)}
                    </Tabs>
                </AppBar>
                {selectedDetail === false && <TabContainer className="initialInstructions">
                    Select a detail from the icons above    
                </TabContainer>}
                {containerIDs.info !== undefined && selectedDetail === containerIDs.info && <TabContainer>
                    { card.part_of_speech ? <h4>Part of speech: {card.part_of_speech}</h4> : ''}
                    { card.tense ? <h4>Tense: {card.tense}</h4> : ''}
                    { card.gender ? <h4>Gender: {card.gender} </h4> : ''}
                    { card.number ? <h4>Number: {card.number}</h4> : '' }
                    { card.declension ? <h4>Tense: {card.declension}</h4> : ''}
                    { card.number_of_occurances ? <h4>Number of occurances: {card.number_of_occurances}</h4> : ''}
                    { card.noted_scripture ? <h4>Noted Scripture: {card.noted_scripture}</h4> : ''}
                </TabContainer>}
                {(containerIDs.notes !== undefined && selectedDetail === containerIDs.notes) && <TabContainer>
                    <NoteEditor
                        note={card.note}
                        addOrUpdateUserNote={this.props.addOrUpdateUserNote}
                    />
                </TabContainer>}
                {(containerIDs.devotional !== undefined && selectedDetail === containerIDs.devotional) && <TabContainer>
                    <ReactMarkdown source={card.devotional}/>
                </TabContainer>}
                {(containerIDs.images !== undefined && selectedDetail === containerIDs.images) && <TabContainer>
                    <GridContainer>
                        {card.images.map((image) => {
                            return (<GridItem key={image._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                                <img 
                                    className="cardImage" 
                                    alt="card"
                                    src={image.url} />
                            </GridItem>); 
                        })}; 
                    </GridContainer>
                </TabContainer>}
                {(containerIDs.video_link !== undefined && selectedDetail === containerIDs.video_link) && <TabContainer className="videoContainer">
                    <div className="cardVideo">
                        <Youtube
                            className="videoPlayer"
                            videoId={youtubeID}
                            opts={{
                                height: '349',
                                width: '560'
                            }}
                        />
                    </div>
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