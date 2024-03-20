import { createUser } from "./register-model";

export function registerController(registerForm) {

    // Evento que escucha al submit
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitamos la validacion del formulario
    });

    // Funcion para manejar el envio del formulario de registro
    function handleRegisterFormSubmit(registerForm) {
        let error = [];

        // Verificar si el correo electronico es valido
        if (correctEmail(registerForm)) {
            // Verificar si las contraseñas son iguales
            if (correctPassword(registerForm)) {
                registerUser(registerForm); // Crear usuario si todo es válido
            } else {
                error.push('Las contraseñas no coinciden');
            }
        } else {
            error.push('El correo electrónico no es válido');
        }

        // Manejar errores
        if (error.length > 0) {
            // Manejar los errores aquí (por ejemplo, mostrar mensajes de error)
            console.log(error);
        }
    }

    // Funcion para verificar si el correo electronico es valido
    function correctEmail(registerForm) {
        const email = registerForm.querySelector('#email');
        const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        

        return emailRegExp.test(email.value); // Evaluamos que sea correcto
    }

    // Funcion para verificar si las contraseñas son iguales
    function correctPassword(registerForm) {
        const password = registerForm.querySelector('#password');
        const passwordConfirmation = registerForm.querySelector('#confirm-password');

        return password.value === passwordConfirmation.value;
    }

    // Funcion para crear usuario
    async function registerUser(registerForm) {
        const email = registerForm.querySelector('#email');
        const password = registerForm.querySelector('#password');

        try {
            await createUser(email.value, password.value);
            dispatchEvent('register-notification', {
                message: 'Te has registrado correctamente',
                type: 'success'
            }, registerForm);

            // Redirigir después de un breve retraso
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            dispatchEvent('register-notification', {
                message: error,
                type: 'error'
            }, registerForm);
        }
    }
}
