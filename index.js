import { sessionController } from "./session/session-controller.js";
import { spinnerController } from "./spinner/spinner-controller.js";
import { adsPanelController } from "./ads-list/ads-list-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";


document.addEventListener('DOMContentLoaded', () => {
    const session = document.querySelector('#session');
    sessionController(session);

    const notificationList = document.querySelector('.notification-list');
    const { showNotification } = notificationController(notificationList);

    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner);

    const adsPanel = document.querySelector('.ads-panel');
    adsPanel.addEventListener('error-loading-ads', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();
    });

    adsPanel.addEventListener('show-spinner', (event) => {
        showSpinner();
        event.stopPropagation();
    });

    adsPanel.addEventListener('hide-spinner', (event) => {
        hideSpinner();
        event.stopPropagation();
    });

    adsPanelController(adsPanel);
})