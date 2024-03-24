import { buildSession, buildAuthenticatedSession } from "./session-view.js";

export function sessionController(navNode) {

    if (isUserLoggedIn()) {
        navNode.innerHTML = buildAuthenticatedSession();
        const logoutButton = navNode.querySelector('button');
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            sessionController(navNode);
            window.location.href = './index.html';
        });
    } else {
        navNode.innerHTML = buildSession();
    };
};

function isUserLoggedIn() {
    return localStorage.getItem('token');
}