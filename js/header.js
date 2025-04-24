// JS-реализация sticky-эффекта
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const stickyStart = header.offsetTop;
    
    if (window.pageYOffset > stickyStart) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});