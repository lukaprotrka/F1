// Contact Form Module
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const sendAnotherBtn = document.getElementById('sendAnother');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', resetForm);
    }
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error on input
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('error');
            }
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Validate all fields
    let isValid = true;
    isValid = validateField(name) && isValid;
    isValid = validateField(email) && isValid;
    isValid = validateField(subject) && isValid;
    isValid = validateField(message) && isValid;
    
    if (isValid) {
        // Save to localStorage (simulating form submission)
        const formData = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
            timestamp: new Date().toISOString()
        };
        
        // Get existing submissions
        let submissions = JSON.parse(localStorage.getItem('f1-contact-submissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('f1-contact-submissions', JSON.stringify(submissions));
        
        // Show success message
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        
        // Reset form
        document.getElementById('contactForm').reset();
    }
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is empty
    if (field.value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Name validation
    if (field.id === 'name' && field.value.trim() !== '') {
        if (field.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        }
    }
    
    // Subject validation
    if (field.id === 'subject' && field.value.trim() !== '') {
        if (field.value.trim().length < 3) {
            isValid = false;
            errorMessage = 'Subject must be at least 3 characters';
        }
    }
    
    // Message validation
    if (field.id === 'message' && field.value.trim() !== '') {
        if (field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
    }
    
    // Update UI
    if (isValid) {
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    } else {
        formGroup.classList.add('error');
        errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

function resetForm() {
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('contactForm').style.display = 'block';
    
    // Clear all error states
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}
