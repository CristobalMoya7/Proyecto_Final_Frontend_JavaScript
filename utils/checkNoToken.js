export const checkNoToken = (eventName, node) => {
    const event = new CustomEvent(eventName, {
        detail: {
            message: 'You need to log-in first',
            type: 'error'
        }
    });

    node.dispatchEvent(event);
};