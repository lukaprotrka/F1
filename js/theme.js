// Theme Toggle Module
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
});

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('f1-guide-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    // Theme toggle click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('f1-guide-theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Add animation
        this.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.textContent = '🌙';
    } else {
        iconElement.textContent = '☀️';
    }
}
