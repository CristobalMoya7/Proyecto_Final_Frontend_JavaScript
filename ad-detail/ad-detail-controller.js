import { loadSpinner } from "../utils/loadSpinner.js";
import { getAdDetail, getUserData, deleteAd } from "./ad-detail-model.js";
import { buildAdDetail } from "./ad-detail-view.js";
import { dispatchEvent } from "../utils/dispatchEvent.js";
import { goBackButton } from "../utils/goBackButton.js";

export async function adDetailController(adDetailNode) {
    const params = new URLSearchParams(window.location.search);
    const adId = params.get('adId');

    if (!adId) {
        window.location.href = './index.html'
    };

    goBackButton(adDetailNode)

    try {
        loadSpinner('show-spinner', adDetailNode)
        const ad = await getAdDetail(adId);

        if (ad.id !== undefined) {
            handleRemoveAdButton(adDetailNode, ad);

            const container = adDetailNode.querySelector('#container');
            container.innerHTML = buildAdDetail(ad);
        } else {
            throw new Error('This advertisement does not exist')
        }

    } catch (error) {
        dispatchEvent('notification-ad-detail', {
            message: error,
            type: 'error'
        }, adDetailNode);

    } finally {
        loadSpinner('hide-spinner', adDetailNode);
    };

    async function handleRemoveAdButton(adDetailNode, ad) {
        const token = localStorage.getItem('token');
        const userData = await getUserData(token);
        const removeAdButton = adDetailNode.querySelector('#removeAdButton');

        if (ad.owner === userData.id) {
            removeAdButton.classList.remove('remove-button-hidden');
            removeAdButton.addEventListener('click', () => {
                removeAd(ad.id, token)
            });
        };
    };

    async function removeAd(adId, token) {
        if (window.confirm('Are you sure you want to delete this ad?')) {
            try {
                await deleteAd(adId, token);
                dispatchEvent('notification-ad-detail', {
                    message: 'Ad deleted succesfully',
                    type: 'success'
                }, adDetailNode);

                setTimeout(() => {
                    window.location.href = './index.html'
                }, 2000);

            } catch (error) {
                dispatchEvent('notification-ad-detail', {
                    message: error,
                    type: 'error'
                }, adDetailNode);
            };
        };
    };

};