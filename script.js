// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form validation and submission
const applicationForm = document.getElementById('staffApplication');
const successModal = document.getElementById('successModal');

applicationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Validate form
    if (!validateForm(formObject)) {
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitButton.disabled = true;
    document.body.classList.add('loading');
    
    try {
        // Simulate form submission (replace with actual endpoint)
        await simulateFormSubmission(formObject);
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        applicationForm.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        document.body.classList.remove('loading');
    }
});

// Form validation function
function validateForm(formData) {
    const errors = [];
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.push('يرجى إدخال بريد إلكتروني صحيح');
    }
    
    // Gmail specific validation
    if (!formData.email.includes('gmail.com')) {
        errors.push('يجب استخدام بريد إلكتروني من Gmail');
    }
    
    // Age validation
    const age = parseInt(formData.age);
    if (age < 13 || age > 99) {
        errors.push('العمر يجب أن يكون بين 13 و 99 سنة');
    }
    
    // Name validation
    if (formData.name.trim().length < 2) {
        errors.push('يرجى إدخال اسم صحيح');
    }
    
    // Experience validation
    if (formData.experience.trim().length < 10) {
        errors.push('يرجى كتابة تفاصيل أكثر عن خبرتك (10 أحرف على الأقل)');
    }
    
    // Motivation validation
    if (formData.motivation.trim().length < 10) {
        errors.push('يرجى كتابة تفاصيل أكثر عن دوافعك (10 أحرف على الأقل)');
    }
    
    // Terms agreement validation
    if (!formData.agreeRules) {
        errors.push('يجب الموافقة على قوانين السيرفر');
    }
    
    // Birthday validation (must be in the past)
    const birthday = new Date(formData.birthday);
    const today = new Date();
    if (birthday >= today) {
        errors.push('تاريخ الميلاد يجب أن يكون في الماضي');
    }
    
    // Age consistency with birthday
    const calculatedAge = Math.floor((today - birthday) / (365.25 * 24 * 60 * 60 * 1000));
    if (Math.abs(calculatedAge - age) > 1) {
        errors.push('العمر المدخل لا يتطابق مع تاريخ الميلاد');
    }
    
    if (errors.length > 0) {
        alert('يرجى تصحيح الأخطاء التالية:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Simulate form submission (replace with actual API call)
async function simulateFormSubmission(formData) {
    // This is where you would send the data to your backend
    // For now, we'll just simulate a delay and log the data
    
    console.log('Form Data:', formData);
    
    // Create email content
    const emailContent = createEmailContent(formData);
    console.log('Email Content:', emailContent);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would:
    // 1. Send this data to your backend server
    // 2. The backend would send an email to your designated email address
    // 3. The backend would also send a confirmation email to the applicant
    
    return { success: true };
}

// Create email content from form data
function createEmailContent(formData) {
    return `
طلب انضمام جديد لفريق الطاقم - Hydra Land
===========================================

معلومات المتقدم:
- الاسم: ${formData.name}
- البريد الإلكتروني: ${formData.email}
- العمر: ${formData.age}
- تاريخ الميلاد: ${formData.birthday}
- المنطقة الزمنية: ${formData.timezone}
- الساعات المتاحة أسبوعياً: ${formData.weeklyHours}

الخبرة:
${formData.experience}

دوافع الانضمام:
${formData.motivation}

تاريخ التقديم: ${new Date().toLocaleString('ar-SA')}

---
يرجى مراجعة الطلب والرد على المتقدم عبر البريد الإلكتروني.
    `;
}

// Show success modal
function showSuccessModal() {
    successModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
        closeModal();
    }
});

// Input animations and validation feedback
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        validateField(this);
    });
});

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove previous error styling
    field.classList.remove('error', 'success');
    
    let isValid = true;
    
    switch(fieldName) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value) && value.includes('gmail.com');
            break;
        case 'name':
            isValid = value.length >= 2;
            break;
        case 'age':
            const age = parseInt(value);
            isValid = age >= 13 && age <= 99;
            break;
        case 'experience':
        case 'motivation':
            isValid = value.length >= 10;
            break;
        default:
            isValid = value.length > 0;
    }
    
    if (value.length > 0) {
        field.classList.add(isValid ? 'success' : 'error');
    }
}

// Add dynamic styles for validation feedback
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ff4757;
        box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1);
    }
    
    .form-group input.success,
    .form-group select.success,
    .form-group textarea.success {
        border-color: #2ed573;
        box-shadow: 0 0 0 3px rgba(46, 213, 115, 0.1);
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.rule-card, .contact-card, .faq-item').forEach(el => {
    observer.observe(el);
});

// Add fadeInUp animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .rule-card, .contact-card, .faq-item {
        opacity: 0;
    }
`;
document.head.appendChild(animationStyle);

// Console log for debugging
console.log('Hydra Land Staff Application Website Loaded Successfully!');
console.log('Note: This is a frontend-only implementation. To enable email functionality, you need to:');
console.log('1. Set up a backend server (Node.js, PHP, Python, etc.)');
console.log('2. Configure email service (SendGrid, Nodemailer, etc.)');
console.log('3. Update the form submission to send data to your backend endpoint');