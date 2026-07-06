const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    
    // Toggle accessibility text element values and tracking view labels configurations
    if (mainNav.classList.contains('open')) {
        menuToggle.innerHTML = '&times;'; // Render functional 'X' close visual node symbol safely
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
    } else {
        menuToggle.innerHTML = '&#9776;'; // Standard visual layout tracking handle elements
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
});