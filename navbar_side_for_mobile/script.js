"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const header = document.querySelector('header');
var didScroll = false;
var lastScrollTop = 0;
var delta = 5;
window.addEventListener('scroll', () => {
    didScroll = true;
});
setInterval(() => {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);
function hasScrolled() {
    if (header) {
        var navbarHeight = header.offsetHeight;
        var st = window.scrollY;
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            header.classList.add('nav-up');
            header.classList.remove('nav-down', 'nav-scrolled');
        }
        else {
            // If did not scroll past the document (possible on mac)...
            if (st + window.innerHeight < document.body.offsetHeight) {
                header.classList.add('nav-down');
                header.classList.remove('nav-up', 'nav-scrolled');
            }
        }
        if (st >= 250) {
            header.classList.add('nav-scrolled');
        }
        lastScrollTop = st;
    }
}
