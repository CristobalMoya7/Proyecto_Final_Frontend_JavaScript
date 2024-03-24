export function goBackButton(node) {
    const backButton = node.querySelector('#goBack');
    backButton.addEventListener('click', () => {
        window.history.back();
    });
};