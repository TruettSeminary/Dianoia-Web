import React from 'react'; 
import { compose } from 'redux'; // bindActionCreators
import { connect } from 'react-redux'; 

import { feedbackSelector } from './selectors'; 

import Zapier from 'utils/zapier'; 
import { notify } from 'utils/notification'; 

//Design 
import GridContainer from 'md-components/Grid/GridContainer';
import GridItem from 'md-components/Grid/GridItem'; 
import Hidden from "material-ui/Hidden";
import Button from 'md-components/CustomButtons/Button'; 
import CustomInput from 'md-components/CustomInput/CustomInput'; 

import './styles.css'; 

class FeedbackPage extends React.Component {

    constructor(props) {
        super(props); 

        this.initState = (props) => {
            const user = props.user || {}; 
            return {
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                subject: '',
                message: ''
            }
        }

        this.state = this.initState(props); 
    }

    sendFeedback() {
        Zapier.sendFeedback({
            ...this.state
        }).then((res) => {
            // reset state
            if(res && res.status && res.status === "success") {
                notify('Feedback Sent!', 'success'); 
                this.setState(this.initState(this.props)); 
            }
            else {
                notify('There was an issue sending your feedback. Please try again.', 'warning'); 
            }
        })
    }

    handleChange(event, key) {
        let newState = {}; 
        newState[key] = event.target.value; 
        this.setState(newState); 
    }

    canSend() {
        const {first_name, last_name, email, message} = this.state;
        return first_name && last_name && email && message; 
    }

    render() {
        const addPadding = (<Hidden smDown><GridItem md={2} lg={2} xl={2}></GridItem></Hidden>);

        return (
            <div className="feedbackPageContainer">
                <GridContainer justify="center">
                    {addPadding}
                    <GridItem xs={12} sm={12} md={8} lg={8} xl={8}>
                        We appreciate your feedback! Send us a message about any features you are enjoying, issues you are having with the appreciate, 
                        or anything else you'd like to share! 
                    </GridItem>
                    {addPadding}
                    {addPadding}
                    <GridItem xs={12} sm={12} md={4} lg={4} xl={4}>
                        <CustomInput
                            labelText="First Name"
                            id="feedback_first_name"
                            type="text"
                            inputProps={{
                                type: 'text', 
                                value: this.state.first_name,
                                disabled: this.props.user !== undefined && this.props.user.first_name !== '',
                                onChange: (event) => this.handleChange(event, 'first_name'),
                                classes: {
                                    root: 'input'
                                }
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} lg={4} xl={4}>
                        <CustomInput
                            labelText="Last Name"
                            id="feedback_last_name"
                            type="text"
                            inputProps={{
                                type: 'text', 
                                value: this.state.last_name,
                                disabled: this.props.user !== undefined && this.props.user.last_name !== '',
                                onChange: (event) => this.handleChange(event, 'last_name'),
                                classes: {
                                    root: 'input'
                                }
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    {addPadding}
                    {addPadding}
                    <GridItem xs={12} sm={12} md={4} lg={4} xl={4}>
                        <CustomInput
                            labelText="Email"
                            id="feedback_email"
                            type="email"
                            inputProps={{
                                type: 'email', 
                                value: this.state.email,
                                onChange: (event) => this.handleChange(event, 'email'),
                                classes: {
                                    root: 'input'
                                }
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} lg={4} xl={4}>
                        <CustomInput
                            labelText="Message subject"
                            id="feedback_subject"
                            type="text"
                            inputProps={{
                                type: 'text', 
                                onChange: (event) => this.handleChange(event, 'subject'),
                                classes: {
                                    root: 'input'
                                }
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    {addPadding}
                    {addPadding}
                    <GridItem xs={12} sm={12} md={8} lg={8} xl={8}>
                        <CustomInput
                            labelText="Message"
                            id="feedback_message"
                            type="text"
                            inputProps={{
                                type: 'text', 
                                onChange: (event) => this.handleChange(event, 'message'),
                                classes: {
                                    root: 'input'
                                }
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    {addPadding}
                    {addPadding}
                    <GridItem xs={12} sm={12} md={8} lg={8} xl={8}>
                        <Button
                            onClick={() => this.sendFeedback()}
                            disabled={!this.canSend()}
                            type="submit"
                            color="success">
                            Send
                        </Button>
                    </GridItem>
                    {addPadding}
                </GridContainer>
            </div>
        );
    }
}

const mapStateToProps = feedbackSelector(); 
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(FeedbackPage);