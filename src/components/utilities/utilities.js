export function getTop(element, relativeEl) {
    const elRect = element.getBoundingClientRect();
    const relativeELRect = relativeEl.getBoundingClientRect();
    return elRect.top - relativeELRect.top - 1; // -1 for border width
}

export function getLeft(element, relativeEl) {
    const elRect = element.getBoundingClientRect();
    const relativeELRect = relativeEl.getBoundingClientRect();
    return elRect.left - relativeELRect.left - 1; // -1 for border width
}