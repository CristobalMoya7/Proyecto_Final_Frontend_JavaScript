export const loadSpinner = (eventName, node) => {
    const event = new CustomEvent(eventName);

    node.dispatchEvent(event);
};