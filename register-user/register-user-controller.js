import { dispatchEvent } from "../utils/dispatchEvent.js";
import { goBackButton } from "../utils/goBackButton.js";
import { loadSpinner } from "../utils/loadSpinner.js";
import { createUser } from "./register-user-model.js";

export function registerUserController(registerFormNode) {

    goBackButton(registerFormNode);

    registerFormNode.addEventListener('submit', (event) => {
        event.preventDefault();

        handleSignupFormSubmit(registerFormNode);
    });

    function handleSignupFormSubmit(registerFormNode) {
        let errors = [];

        if (!isEmailValid(registerFormNode)) {
            errors.push('Wrong format for email field');
            toggleErrorClass(registerFormNode, errors);
        };

        if (!arePasswordsEqual(registerFormNode)) {
            errors.push('"Password" and "Confirm password" are different')
            toggleErrorClass(registerFormNode, errors);
        };

        if (!isPasswordLengthOk(registerFormNode)) {
            errors.push('Passwords must have at least 6 characters')
            toggleErrorClass(registerFormNode, errors);
        };

        showFormErrors(errors);

        if (errors.length === 0) {
            registerUser(registerFormNode);
        };
    };

    function isEmailValid(registerFormNode) {
        const email = registerFormNode.querySelector('#email');
        const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

        return emailRegExp.test(email.value);
    };

    function arePasswordsEqual(registerFormNode) {
        const password = registerFormNode.querySelector('#password');
        const passwordCheck = registerFormNode.querySelector('#passwordCheck');

        return password.value === passwordCheck.value;
    };

    function isPasswordLengthOk(registerFormNode) {
        const password = registerFormNode.querySelector('#password');
        const passwordCheck = registerFormNode.querySelector('#passwordCheck');
        return password.value.length >= password.value.length && passwordCheck.value.length >= password.minLength;
    };

    function showFormErrors(errorsList) {
        for (const error of errorsList) {
            dispatchEvent('register-user-notification', {
                message: error,
                type: 'error'
            }, registerFormNode);
        };
    };

    function toggleErrorClass(registerFormNode, errorList) {
        const emailInput = registerFormNode.querySelector('#email');
        const passwordInput = registerFormNode.querySelector('#password');
        const passwordCheckInput = registerFormNode.querySelector('#passwordCheck');

        emailInput.classList.remove('field-error');
        passwordInput.classList.remove('field-error');
        passwordCheckInput.classList.remove('field-error');

        if (errorList.includes('Wrong format for email field')) {
            email.classList.add('field-error');
        };

        if (errorList.includes('"Password" and "Confirm password" are different')
            || errorList.includes('Passwords must have at least 6 characters')) {
            password.classList.add('field-error');
            passwordCheck.classList.add('field-error');
        };

    };

    async function registerUser(registerFormNode) {
        const email = registerFormNode.querySelector('#email');
        const password = registerFormNode.querySelector('#password');

        try {
            loadSpinner('show-spinner', registerFormNode)
            await createUser(email.value, password.value);

            dispatchEvent('register-user-notification', {
                message: 'Success! Log in to start selling!',
                type: 'success'
            }, registerFormNode);

            setTimeout(() => {
                window.location.href = './login.html';
            }, 2000);

        } catch (error) {
            dispatchEvent('register-user-notification', {
                message: error,
                type: 'error'
            }, registerFormNode);

        } finally {
            loadSpinner('hide-spinner', registerFormNode);
        };
    };
};