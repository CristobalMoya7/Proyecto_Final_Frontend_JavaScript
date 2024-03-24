import { sessionController } from "./session/session-controller.js";
import { spinnerController } from "./spinner/spinner-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";
import { loginController } from "./login/login-controller.js";


document.addEventListener('DOMContentLoaded', () => {
    const session = document.querySelector('#session');
    sessionController(session);

    const notifications = document.querySelector('.notification');
    const { showNotification } = notificationController(notifications)

    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner);

    const loginFormNode = document.querySelector('#loginForm');
    loginFormNode.addEventListener('login-user-notification', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();
    });

    loginFormNode.addEventListener('show-spinner', (event) => {
        showSpinner();
        event.stopPropagation();
    });

    loginFormNode.addEventListener('hide-spinner', (event) => {
        hideSpinner();
        event.stopPropagation();
    });

    loginController(loginFormNode);
});