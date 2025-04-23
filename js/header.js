window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('fixed', window.scrollY > 10);
});