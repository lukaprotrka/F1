// Navigation Module
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
});

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            window.F1Guide.navigateToPage(pageId);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            window.F1Guide.navigateToPage(hash);
        }
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
