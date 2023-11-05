var didScroll;
var lastScrollTop = 0;
var delta = 5;
const bouncingArrow = document.getElementById('arrow-down');
window.addEventListener('scroll',() => { didScroll = true; });
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);
function hasScrolled() {
    var st = window.scrollY;
    if (Math.abs(lastScrollTop-st) <= delta) {
        return;
    }
    if (st<100) {
        bouncingArrow.classList.remove('hidden');
    }
    else {
        bouncingArrow.classList.add('hidden');
    }
    lastScrollTop = st;
}