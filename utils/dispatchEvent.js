export const dispatchEvent = (eventName, data, node) => {
    const event = new CustomEvent(eventName, {
        detail: data
    });

    node.dispatchEvent(event);
};