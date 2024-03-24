import { loadSpinner } from "../utils/loadSpinner.js"
import { dispatchEvent } from "../utils/dispatchEvent.js"
import { loginUser } from "./login-model.js";
import { goBackButton } from "../utils/goBackButton.js"

export const loginController = (loginFormNode) => {

    goBackButton(loginFormNode);

    loginFormNode.addEventListener('submit', (event) => {
        event.preventDefault();
        submitLogin(loginFormNode);
    });

    const submitLogin = async (loginFormNode) => {
        const { email, password } = getLoginData(loginFormNode);

        try {
            loadSpinner('show-spinner', loginFormNode);

            const jwt = await loginUser(email, password);
            dispatchEvent('login-user-notification', {
                message: 'Login successful!',
                type: 'success'
            }, loginFormNode);
            localStorage.setItem('token', jwt);

            setTimeout(() => {
                window.location = './index.html';
            }, 2000);

        } catch (error) {
            dispatchEvent('login-user-notification', {
                message: error,
                type: 'error'
            }, loginForm);
        } finally {
            loadSpinner('hide-spinner', loginFormNode);
        };
    };

    const getLoginData = (loginFormNode) => {

        const email = loginFormNode.querySelector('#email');
        const password = loginFormNode.querySelector('#password');

        return {
            email: email.value,
            password: password.value
        };
    };
};
