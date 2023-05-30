export const createElement = (tag, attr) => {
    const elem = document.createElement(tag);
    return Object.assign(elem, attr);
}