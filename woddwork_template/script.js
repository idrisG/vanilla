var didScroll;
var lastScrollTop = 0;
var delta = 5;
// on scroll, let the interval function know the user has scrolled
const bouncingArrow = document.getElementById('arrow-down');
$(window).scroll(function(event){
    didScroll = true;
});
// run hasScrolled() and reset didScroll status
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);
function hasScrolled() {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop-st) <= delta) {
        return;
    }
    
    if (st<10) {
        bouncingArrow.classList.remove('hidden');
    }
    else {
        bouncingArrow.classList.add('hidden');
        lastScrollTop = st;
    }
}