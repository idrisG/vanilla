const hiddenElements = document.querySelectorAll('.hidden');
const parallaxElements = document.querySelectorAll('.parallax');
const bouncingArrow = document.getElementById('arrow-down');
const header = document.querySelector('header');

var didScroll;
var lastScrollTop = 0;
var delta = 5;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
    });
}, {threshold: 0});
hiddenElements.forEach((el) => {
    observer.observe(el);
});
window.addEventListener('scroll',function(event){
    didScroll = true;
    parallax(parallaxElements);
});
setInterval(function() {
if (didScroll) {
    hasScrolled();
    didScroll = false;
}
}, 250);
function hasScrolled() {
    var navbarHeight = header.offsetHeight;
    var st = window.scrollY;
    console.log(navbarHeight);
    if (Math.abs(lastScrollTop-st) <= delta) {
        return;
    }
    if (st > lastScrollTop && st > navbarHeight){
    // Scroll Down
        header.classList.add('nav-up');
        header.classList.remove('nav-down', 'nav-scrolled');
    } else {
        // If did not scroll past the document (possible on mac)...
        if(st + window.innerHeight < document.body.offsetHeight) { 
            header.classList.add('nav-down');
            header.classList.remove('nav-up', 'nav-scrolled');
        }

    }
    if(st >= 250) {
        header.classList.add('nav-scrolled');
    }
    
    if (st<300) {
        bouncingArrow.classList.remove('hidden');
    }
    else {
        bouncingArrow.classList.add('hidden');
    }
    lastScrollTop = st;
}
const toggle = document.getElementById("menu-toggle");
const menuButton = document.getElementsByClassName('menu-button')[0];
function toggleUncheck() {
    if (toggle.checked) {
        toggle.click()
    }
}

function parallax(elements) {
    elements.forEach( element => {
        let y = element.getBoundingClientRect().top
        if (y < window.innerHeight && y + window.innerHeight > 0 && !element.classList.contains('fade-in')) {
            if(!element.classList.contains('curtain')) {
                if(y<0) {
                    element.style.transform = 'translateY(' + (-0.3 * y) + 'px )';
                } else {
                    element.style.transform = 'translateY(0)';
                }
            } else {
                element.style.backgroundPositionY = (0.3 * y)+'px';
            }
        }
        if(element.classList.contains('fade-in') && y > 0 && y < window.innerHeight) {
            element.style.backgroundColor = 'rgba(255,255,255,' + ((window.innerHeight-y)/window.innerHeight) +')';
        }
    })
};