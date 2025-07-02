document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            
            // Remove preloader from DOM after animation
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle body scroll when mobile menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a nav link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class based on scroll position
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide header on scroll down, show on scroll up
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scroll Down
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scroll Up
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate Stats Counter
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const speed = 200; // The lower the faster
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count') || stat.textContent.replace(/[^0-9]/g, ''));
            const count = 0;
            const increment = target / speed;
            
            // If already animated, skip
            if (stat.getAttribute('data-animated') === 'true') return;
            
            const updateCount = () => {
                const currentCount = parseFloat(stat.textContent.replace(/[^0-9]/g, ''));
                
                if (currentCount < target) {
                    stat.textContent = Math.ceil(currentCount + increment) + (stat.textContent.includes('%') ? '%' : '');
                    setTimeout(updateCount, 1);
                } else {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '');
                    stat.setAttribute('data-animated', 'true');
                }
            };
            
            // Only animate when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                }
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // Initialize stats counter
    animateStats();
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .section-title, .section-subtitle');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize scroll animations
    animateOnScroll();
    
    // ===== OUR WORK CAROUSEL =====


    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We\'ll get back to you soon.';
                contactForm.prepend(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
});
