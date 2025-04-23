window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const body = document.body;
    
    if (window.scrollY > 10) {
        header.classList.add('sticky');
        body.classList.add('sticky-header-padding');
    } else {
        header.classList.remove('sticky');
        body.classList.remove('sticky-header-padding');
    }
});