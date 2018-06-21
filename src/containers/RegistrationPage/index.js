import React from 'react'; 
// import PropTypes from 'prop-types';
import { compose } from 'redux'; // bindActionCreators
import { connect } from 'react-redux'; 

// React/Redux Config
import {
    submitRegistration
} from 'collections/user/actions';

//Design 
import GridContainer from 'md-components/Grid/GridContainer';
import GridItem from 'md-components/Grid/GridItem'; 
import Button from 'md-components/CustomButtons/Button'; 
import CustomInput from 'md-components/CustomInput/CustomInput'; 


import styles from './styles'; 

class RegistrationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props, 
            first_name: null, 
            last_name: null, 
            email: null,
            confirmed_email: null,
            password: null,
            confirmed_password: null
        }
    }

    handleChange(event, key) {
        let newState = {}; 
        newState[key] = event.target.value; 
        this.setState(newState); 
    }

    registrationSuccess() {
        // redirect to home page and login user
    }

    registrationFail() {

    }

    submitRegistrationForm() {
        if(this.canSubmit()) {
            const first_name = this.state.first_name.trim(); 
            const last_name = this.state.last_name.trim();
            const email = this.state.email.trim().toLowerCase() 
            const password = this.state.password.trim(); 

            this.props.registerUser(email, password, first_name, last_name); 
            // TODO: clean up form and redirect page
        }

    }

    canSubmit() {
        if([null, ''].includes(this.state.first_name)) return false; 
        if([null, ''].includes(this.state.last_name)) return false;
        if(!this.emailCheck("success")) return false; 
        if(!this.passwordCheck("success")) return false; 
        
        return true; 
    }

    emailCheck(field) {
        const email = this.state.email;
        const confirmed_email = this.state.confirmed_email; 

        if(email !== null && confirmed_email !== null) {

            if(email.trim().toLowerCase() === confirmed_email.trim().toLowerCase() && email.trim() !== '') {
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
            <div style={styles.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6} lg={6} xl={4}>
                        Please provide some information to register as a new user with Dianoia. 
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} lg={4} xl={4}>
                        <CustomInput
                            labelText="First Name"
                            id="first_name"
                            type="text"
                            success={this.state.first_name !== null && this.state.first_name !== ''}
                            error={this.state.first_name === ''}
                            inputProps={{
                                type: 'text', 
                                onChange: (event) => this.handleChange(event, 'first_name')
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CustomInput
                            labelText="Last Name"
                            id="last_name"
                            type="text"
                            success={this.state.last_name !== null && this.state.last_name !== ''}
                            error={this.state.last_name === ''}
                            inputProps={{
                                type: 'text', 
                                onChange: (event) => this.handleChange(event, 'last_name')
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CustomInput
                            labelText="Email"
                            id="email"
                            type="email"
                            success={this.emailCheck("success")}
                            error={this.emailCheck("error")}
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
                    <CustomInput
                            labelText="Confirm Email"
                            id="email"
                            type="email"
                            success={this.emailCheck("success")}
                            error={this.emailCheck("error")}
                            inputProps={{
                                type: 'email', 
                                onChange: (event) => this.handleChange(event, 'confirmed_email') 
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CustomInput
                            labelText="Password"
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
                            labelText="Confirm Password"
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
                    {/* <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                        I Agree to the terms of use
                    </GridItem> */}
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Button
                            onClick={() => this.submitRegistrationForm()}
                            disabled={!this.canSubmit()}
                            type="submit"
                            color="success">
                            Reigster
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

// RegistrationPage.propTypes = {};

// TODO: add error messages based on props
const mapStateToProps = () => {
    return {}; 
}; 

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (email, password, first_name, last_name) => {
            dispatch(submitRegistration(email, password, first_name, last_name))
        },
        dispatch
    }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(RegistrationPage); 