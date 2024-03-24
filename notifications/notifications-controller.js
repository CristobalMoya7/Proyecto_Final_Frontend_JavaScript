import { buildNotification } from "./notifications-view.js";


export function notificationController(notificationNode) {
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerHTML = buildNotification(message);
        notificationNode.appendChild(notification);

        setTimeout(() => {
            notification.remove()
        }, 2000);
    }

    return {
        showNotification
    }
};