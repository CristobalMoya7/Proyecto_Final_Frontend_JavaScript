import { sessionController } from "./session/session-controller.js";
import { spinnerController } from "./spinner/spinner-controller.js";
import { adDetailController } from "./ad-detail/ad-detail-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const session = document.querySelector('#session');
    sessionController(session);

    const adDetail = document.querySelector('.ad-detail');

    const notificationList = document.querySelector('.notification');
    const { showNotification } = notificationController(notificationList);

    const spinner = document.querySelector('#spinner')
    const { showSpinner, hideSpinner } = spinnerController(spinner)

    adDetail.addEventListener('notification-ad-detail', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();
    })

    adDetail.addEventListener('show-spinner', (event) => {
        showSpinner();
        event.stopPropagation()
    })
    adDetail.addEventListener('hide-spinner', (event) => {
        hideSpinner();
        event.stopPropagation()
    })

    adDetailController(adDetail);
});