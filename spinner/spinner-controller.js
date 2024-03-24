import { buildSpinner } from "./spinner-view.js";


export function spinnerController(spinner) {

    const showSpinner = () => {
        spinner.classList.add('active');
        spinner.innerHTML = buildSpinner();
    }
    const hideSpinner = () => {
        spinner.classList.remove('active');
        spinner.innerHTML = '';

    }

    return {
        showSpinner,
        hideSpinner
    }
}