import { sessionController } from "./session/session-controller.js";
import { spinnerController } from "./spinner/spinner-controller.js"
import { notificationController } from "./notifications/notifications-controller.js"
import { registerUserController } from "./register-user/register-user-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const session = document.querySelector('#session');
    sessionController(session);

    const notifications = document.querySelector('.notification');
    const { showNotification } = notificationController(notifications);

    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner);

    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener('register-user-notification', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();
    });

    registerForm.addEventListener('show-spinner', (event) => {
        showSpinner();
        event.stopPropagation();
    });

    registerForm.addEventListener('hide-spinner', (event) => {
        hideSpinner();
        event.stopPropagation();
    })

    registerUserController(registerForm);
})