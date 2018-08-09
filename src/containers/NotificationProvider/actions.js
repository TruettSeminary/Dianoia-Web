import {
    SEND_NOTIFICATION, 
    CLOSE_NOTIFICATION,
    CLEAR_NOTIFICATIONS
} from './constants'; 

export function sendNotification(message, level) {
    return {
        type: SEND_NOTIFICATION, 
        data: {
            message, 
            level
        }
    }
}

export function closeNotification(notification_id) {
    return {
        type: CLOSE_NOTIFICATION, 
        data: {
            notification_id
        }
    }
}

export function clearNotifications() {
    return {
        type: CLEAR_NOTIFICATIONS
    }
}