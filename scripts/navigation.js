const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    if (mainNav.classList.contains('open')) {
        menuToggle.innerHTML = '&times;';
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
    } else {
        menuToggle.innerHTML = '&#9776;';
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
});