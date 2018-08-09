import { dispatch } from 'index.js'; 
import { 
    sendNotification,
    clearNotifications
} from 'containers/NotificationProvider/actions'

const notify = (message, level) => {
    dispatch(sendNotification(message, level)); 
}

const clearAllNotifications = () => {
    dispatch(clearNotifications()); 
}

export {
    notify, 
    clearAllNotifications
};

