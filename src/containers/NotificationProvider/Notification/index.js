// React/Redux
import React from 'react'; 
import PropTypes from 'prop-types';

// Design
import Snackbar from 'md-components/Snackbar/SnackbarContent'
import Clearfix from 'md-components/Clearfix/Clearfix';
import InfoOutline from "@material-ui/icons/InfoOutline";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

class Notification extends React.Component {

    constructor(props)  {
        super(props); 

        this.state = {
            timerStarted: false
        }
    }

    componentDidMount() {
        this.startCloseTimer(); 
    }

    handleClose() {
        this.props.close(this.props.id); 
    }

    startCloseTimer() {
        const TIMER_LENGTH = 10000; 
        if(!this.state.timerStarted) {
            setTimeout(() => this.handleClose(), TIMER_LENGTH);
            this.setState({
                timerStarted: true
            })
        }
    }

    getIcon(level) {
        switch(level) {
            case 'success': 
                return Check; 
            case 'warning':
                return Warning; 
            default: 
                return InfoOutline;
        }
    }

    render() {
        return (
            <div>
                <Snackbar
                    message={this.props.message}
                    color={this.props.level}
                    icon={this.getIcon()}
                    handleClose={() => this.handleClose()}
                    close
                />
                <Clearfix/>
            </div>
        );
    }
}

Notification.propTypes = {
    id: PropTypes.string.isRequired, 
    message: PropTypes.string.isRequired, 
    level: PropTypes.string.isRequired, 
    close: PropTypes.func.isRequired
}

export default Notification; 