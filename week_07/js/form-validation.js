/**
 * Form Validation Script for Contact Form with Mailto Integration
 * Handles client-side validation and mailto link generation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
});

function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    // Add form submission validation
    form.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation feedback
    nameField.addEventListener('input', function() {
        clearFieldError(this);
    });
    
    emailField.addEventListener('input', function() {
        clearFieldError(this);
    });
    
    messageField.addEventListener('input', function() {
        clearFieldError(this);
        // Optional: Add character counter feedback here
        const remaining = 500 - this.value.length;
    });
}

function handleFormSubmit(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Reset any previous error styling
    [name, email, message].forEach(field => {
        clearFieldError(field);
    });
    
    let isValid = true;
    
    // Validate name
    if (!validateName(name)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    // Validate message
    if (!validateMessage(message)) {
        isValid = false;
    }
    
    // If validation passes, generate mailto link
    if (isValid) {
        generateMailtoLink(name.value.trim(), email.value.trim(), message.value.trim());
    } else {
        alert('Please correct the errors and try again.');
    }
}

function generateMailtoLink(name, email, message) {
    // Replace with your actual email address
    const recipientEmail = 'g.temp0010@gmail.com';
    
    // Create email subject
    const subject = `Contact Form Message from ${name}`;
    
    // Create email body
    const body = `Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent via the contact form on your website.`;
    
    // Encode components for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Create mailto URL
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Open mailto link
    window.location.href = mailtoUrl;
    
    // Show success message
    showSuccessMessage();
    
    // Clear form after successful submission
    setTimeout(() => {
        document.getElementById('contact-form').reset();
    }, 1000);
}

function showSuccessMessage() {
    const container = document.querySelector('.container');
    const existingMessage = container.querySelector('.success-message');
    
    // Remove existing message if present
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <p style="color: #4CAF50; font-weight: bold; text-align: center; padding: 15px; 
                  background: #f0f8f0; border: 2px solid #4CAF50; border-radius: 5px; 
                  margin-bottom: 20px;">
            Email client opened! Please send the message from your email application.
        </p>`;
    
    container.insertBefore(successDiv, container.firstChild);
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (successDiv && successDiv.parentNode) {
            successDiv.remove();
        }
    }, 8000);
}

function validateName(nameField) {
    const name = nameField.value.trim();
    
    if (name.length < 2) {
        showFieldError(nameField, 'Name must be at least 2 characters long');
        return false;
    }
    
    if (!/^[A-Za-z\s]+$/.test(name)) {
        showFieldError(nameField, 'Name can only contain letters and spaces');
        return false;
    }
    
    return true;
}

function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    
    if (!emailPattern.test(email)) {
        showFieldError(emailField, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validateMessage(messageField) {
    const message = messageField.value.trim();
    
    if (message.length < 10) {
        showFieldError(messageField, 'Message must be at least 10 characters long');
        return false;
    }
    
    if (message.length > 500) {
        showFieldError(messageField, 'Message must be less than 500 characters');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.title = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.title = '';
}