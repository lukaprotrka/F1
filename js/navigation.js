// Navigation Module
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
});

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle (guard in case elements aren't present)
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isActive);
        });
    }
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            window.F1Guide.navigateToPage(pageId);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(event) {
        const pageId = (event.state && event.state.pageId) || window.location.hash.substring(1) || 'home';
        window.F1Guide.navigateToPage(pageId, false);
    });
    
    // Load initial page from URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        window.F1Guide.navigateToPage(initialHash);
    }
    
    // Scroll behavior for nav
    let lastScroll = 0;
    const nav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}
