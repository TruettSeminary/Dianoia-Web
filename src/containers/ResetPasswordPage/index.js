import React from 'react'; 
import { compose } from 'redux'; // bindActionCreators
import { connect } from 'react-redux'; 

// React/Redux Config
import {
    submitResetPassword
} from 'collections/user/actions';

//Design 
import GridContainer from 'md-components/Grid/GridContainer';
import GridItem from 'md-components/Grid/GridItem'; 
import Button from 'md-components/CustomButtons/Button'; 
import CustomInput from 'md-components/CustomInput/CustomInput'; 


import './styles.css'

class ResetPasswordPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confirmed_password: null
        }
    }

    handleChange(event, key) {
        let newState = {}; 
        newState[key] = event.target.value; 
        this.setState(newState); 
    }

    submitResetPasswordForm() {
        if(this.canSubmit()) {
            const password = this.state.password.trim(); 
            const confirmed_password = this.state.confirmed_password.trim(); 

            this.props.submitResetPassword( this.props.code, password, confirmed_password); 
        }

    }

    canSubmit() {
        if(!this.passwordCheck("success")) return false; 
        return true; 
    }

    passwordCheck(field) {
        // TODO: check for characters that can be included
        // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        const password = this.state.password;
        const confirmed_password = this.state.confirmed_password; 

        if(password !== null && confirmed_password !== null) {
            // both fields have been submitted
            if(password.trim() === confirmed_password.trim() && password.trim() !== '') {
                // email match; True for success field, false for error
                return field === "success" ? true : false; 
            }
            else {
                // email do not match; false for success field, true for error
                return field === "success" ? false : true; 
            }
        }

        // there is at least one missing field
        return false; 
    }


    render() {
        return (
            <div className="resetPageContainer">
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6} lg={6} xl={4}>
                        Please enter a new password.
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CustomInput
                            labelText="New Password"
                            id="password"
                            type="password"
                            success={this.passwordCheck("success")}
                            error={this.passwordCheck("error")}
                            inputProps={{
                                type: 'password', 
                                onChange: (event) => this.handleChange(event, 'password')
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                        <CustomInput
                            labelText="Confirm New Password"
                            id="confrim_password"
                            type="password"
                            success={this.passwordCheck("success")}
                            error={this.passwordCheck("error")}
                            inputProps={{
                                type: 'password', 
                                onChange: (event) => this.handleChange(event, 'confirmed_password')
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Button
                            onClick={() => this.submitResetPasswordForm()}
                            disabled={!this.canSubmit()}
                            type="submit"
                            color="success">
                            Submit
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
        submitResetPassword: (code, password, passwordConfirmation) => {
            dispatch(submitResetPassword(code, password, passwordConfirmation))
        },
        dispatch
    }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(ResetPasswordPage); 