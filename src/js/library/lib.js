export const app = {};

/* Get Element */
app.get = function(selector) {
    return document.querySelector(selector);
};