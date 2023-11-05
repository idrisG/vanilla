const hiddenElements = document.querySelectorAll('.hidden');

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
