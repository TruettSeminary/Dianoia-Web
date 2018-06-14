import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 

import makeSelectClassesPage from './selectors'; 


// import {
//     getAllClasses,
//     addClassToUser, 
//     removeClassFromUser
// } from './actions'; 

// Design
import Button from 'md-components/CustomButtons/Button'; 
import ClassCard from 'components/ClassCard'; 

class ClassesPage extends React.Component {

    constructor(props) {
        super(props); 
        this.user = {}

        this.props.getAllClasses(); 
    }

    isUserInClass(clazz) {
        return clazz && clazz.users && clazz.users.reduce((accVal, clazzUser) => {
            return accVal || this.user._id === clazzUser._id; 
        }, false); 
    }

    generateClasses() {
        return this.props.classes.map((clazz) => {
            return (<ClassCard
                key={clazz._id}
                clazz={clazz}
                userInClass={this.isUserInClass(clazz)}
                classAction={(class_id) => {
                    if(this.isUserInClass(clazz)) {
                        this.props.removeClassFromUser(class_id)
                    }
                    else {
                        this.props.addClassToUser(class_id); 
                    }
                }}
            />); 
        }); 
        
    }

    render() {
        // TODO sort classes by joined or not
        return (
            <div>
                {this.generateClasses()}
            </div>
        );
    }
}

const mapStateToProps = makeSelectClassesPage(); 

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => {},
        addClassToUser: (class_id) => {},
        removeClassFromUser: (class_id) => {},
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(ClassesPage); 