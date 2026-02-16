// Main App Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('F1 Guide Website Loaded Successfully!');
    
    // Initialize all modules
    initApp();
});

function initApp() {
    // Add event listeners for navigation buttons
    const navButtons = document.querySelectorAll('[data-navigate]');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-navigate');
            navigateToPage(targetPage);
        });
    });
    
    // Add event listeners for footer links
    const footerLinks = document.querySelectorAll('.footer-section a[data-page]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
}

// Navigate to page function (shared across modules)
function navigateToPage(pageId) {
    // Update URL hash
    window.location.hash = pageId;
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility function to create element with classes
function createElement(tag, classes, content) {
    const element = document.createElement(tag);
    if (classes) {
        element.className = classes;
    }
    if (content) {
        element.innerHTML = content;
    }
    return element;
}

// Export utilities for other modules
window.F1Guide = {
    navigateToPage,
    formatDate,
    createElement
};
