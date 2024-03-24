import { sessionController } from "./session/session-controller.js";
import { notificationController } from "./notifications/notifications-controller.js"
import { spinnerController } from "./spinner/spinner-controller.js";
import { insertAdController } from "./ad-creation/ad-creation-controller.js";
import { checkNoToken } from "./utils/checkNoToken.js";

document.addEventListener('DOMContentLoaded', () => {

    const notification = document.querySelector('.notification');
    const { showNotification } = notificationController(notification);

    const token = localStorage.getItem('token');

    if (!token) {
        document.addEventListener('no-token', (event) => {
            showNotification(event.detail.message, event.detail.type);
            event.stopPropagation();
        });

        setTimeout(() => {
            window.location.href = './index.html';
        }, 2000);

        checkNoToken('no-token', document);
    };

    const session = document.querySelector('#session');
    sessionController(session);

    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner);




    const insertAdFormNode = document.querySelector('#insertAd')

    insertAdFormNode.addEventListener('show-spinner', (event) => {
        event.stopPropagation();
        showSpinner();
    });

    insertAdFormNode.addEventListener('hide-spinner', (event) => {
        event.stopPropagation();
        hideSpinner();
    });

    insertAdFormNode.addEventListener('notification-creating-ad', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();

    })

    insertAdController(insertAdFormNode);
})