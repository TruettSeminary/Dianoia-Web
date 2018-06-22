import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux'; // bindActionCreators
import { connect } from 'react-redux'; 

// React/Redux Config
import {
    submitForgotPassword
} from 'collections/user/actions';


// Design
import GridContainer from 'md-components/Grid/GridContainer';
import GridItem from 'md-components/Grid/GridItem'; 
import Button from 'md-components/CustomButtons/Button'; 
import CustomInput from 'md-components/CustomInput/CustomInput'; 

import './styles.css'

class ForgotPasswordPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
        }
    }

    handleChange(event, key) {
        let newState = {}; 
        newState[key] = event.target.value; 
        this.setState(newState); 
    }

    submitForgotPasswordForm() {
        if(this.canSubmit()) {
            const email = this.state.email.trim().toLowerCase() 
            this.props.submitForgotPassword(email); 
        }
    }

    canSubmit() {
        if([null, ''].includes(this.state.email)) return false; 
        return true;
    }



    render() {
        return (
            <div className="forgotPageContainer">
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6} lg={6} xl={4}>
                        Please provide your email and we will send you a link to reset your password. 
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CustomInput
                            labelText="Email"
                            id="email"
                            type="email"
                            inputProps={{
                                type: 'email', 
                                onChange: (event) => this.handleChange(event, 'email')
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Button
                            onClick={() => this.submitForgotPasswordForm()}
                            disabled={!this.canSubmit()}
                            type="submit"
                            color="success">
                            Send
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {}; 
}; 

const mapDispatchToProps = (dispatch) => {
    return {
        submitForgotPassword: (email) => {
            dispatch(submitForgotPassword(email))
        },
        dispatch
    }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(ForgotPasswordPage); 