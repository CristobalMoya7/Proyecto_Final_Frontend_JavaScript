import { loadSpinner } from "../utils/loadSpinner.js";
import { dispatchEvent } from "../utils/dispatchEvent.js"
import { insertAd } from "./ad-creation-model.js";
import { goBackButton } from "../utils/goBackButton.js";

export function insertAdController(insertAdFormNode) {

    goBackButton(insertAdFormNode)

    insertAdFormNode.addEventListener('submit', async (event) => {
        event.preventDefault();


        handleSubmitNewAd(insertAdFormNode);
    });

    function handleSubmitNewAd(insertAdFormNode) {
        let errors = [];
        const availableTags = ['mobile', 'lifestyle', 'motor', 'work']

        isFieldFilled(insertAdFormNode, errors);

        if (!isRadioButtonChecked(insertAdFormNode)) {
            errors.push('Please, check wether your ad is a sale or a search');
        };

        if (!isUrlValue(insertAdFormNode)) {
            errors.push('Please, enter a valid URL for image field')
        };

        if (!isTagValid(insertAdFormNode, availableTags)) {
            errors.push('Please, enter a category for your ad from "lifestyle", "work", "motor", "mobile" (separated by comma)')
        };

        showFormErrors(errors);

        if (errors.length === 0) {
            const adToInsert = createAdObjectFromForm(insertAdFormNode);
            sendNewAdd(adToInsert);
        }
    };

    function isFieldFilled(insertAdFormNode, errorList) {

        const name = insertAdFormNode.querySelector('#name');
        const price = insertAdFormNode.querySelector('#price');
        const description = insertAdFormNode.querySelector('#description');

        if (name.value.length <= 0) {
            errorList.push('Please, enter a name for your product');
        } else if (price.value <= 0) {
            errorList.push('Please, enter a number for field "Price"');
        } else if (description.value <= 0) {
            errorList.push('Please, enter a description for your offer. 140 chars max.')
        };
    };

    function isRadioButtonChecked(insertAdFormNode) {
        const onSale = insertAdFormNode.querySelector('#onSale');
        const onSearch = insertAdFormNode.querySelector('#onSearch');
        return onSale.checked || onSearch.checked;
    };

    function isUrlValue(insertAdFormNode) {
        const url = insertAdFormNode.querySelector('#image');
        const urlValue = url.value.trim();
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        return urlRegex.test(urlValue) || urlValue.length === 0;
    };

    function isTagValid(insertAdFormNode, tagsList) {
        const tagsReceived = insertAdFormNode.querySelector('#category');
        const tagsReceivedList = tagsReceived.value.split(',').map(item => item.trim().toLowerCase());

        return tagsReceivedList.every(tag => tagsList.includes(tag)) || tagsReceived.value.length === 0;
    };

    function showFormErrors(errorList) {
        for (const error of errorList) {
            dispatchEvent('notification-creating-ad', {
                message: error,
                type: 'error'
            }, insertAdFormNode);
        };
    }

    function createAdObjectFromForm(insertAdFormNode) {
        const formData = new FormData(insertAdFormNode);
        const name = formData.get("name");
        const price = formData.get("price");
        const typeOfOffer = formData.get("typeOfOffer");
        const isOnSale = (typeOfOffer === "onSale");
        const description = formData.get("description")
        const image = formData.get("image");
        const category = formData.get("category");

        return {
            name: name,
            price: price,
            sale: isOnSale,
            description: description,
            image: image,
            category: category
        };
    };

    async function sendNewAdd(adToInsert) {
        try {
            loadSpinner('show-spinner', insertAdFormNode);
            await insertAd(adToInsert);

            dispatchEvent('notification-creating-ad', {
                message: 'Your ad is live now!',
                type: 'success'
            }, insertAdFormNode);

            setTimeout(() => {
                window.location = "./index.html";
            }, 2000);

        } catch (error) {
            dispatchEvent('notification-creating-ad', {
                message: error,
                type: 'error'
            }, insertAdFormNode);

        } finally {
            loadSpinner('hide-spinner', insertAdFormNode);
        };
    };
};