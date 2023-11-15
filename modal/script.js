"use strict";
let preventClose = false;
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.visibility = 'visible';
        modal.style.zIndex = '2';
    }
}
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal && !preventClose) {
        modal.style.visibility = 'hidden';
        modal.style.zIndex = '-1';
    }
    preventClose = false;
}
function clickInModal() {
    preventClose = true;
}
