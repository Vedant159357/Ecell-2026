// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const sections = document.querySelectorAll('section');
const statNumbers = document.querySelectorAll('.stat-number');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth Scroll for Navigation Links
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

// Intersection Observer for Scroll Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Animated Counters
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function startCounters() {
    statNumbers.forEach(number => {
        const rect = number.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible && !number.classList.contains('animated')) {
            number.classList.add('animated');
            animateCounter(number);
        }
    });
}

// Trigger counters on scroll
window.addEventListener('scroll', startCounters);
window.addEventListener('load', startCounters);

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-layer');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Image Skeleton Loader
function loadImage(img) {
    const src = img.getAttribute('src');
    if (!src) return;

    img.classList.add('skeleton');

    const image = new Image();
    image.onload = () => {
        img.classList.remove('skeleton');
        img.src = src;
    };
    image.src = src;
}

// Load images with skeleton effect
document.querySelectorAll('.gallery-item img').forEach(img => {
    loadImage(img);
});

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple styles dynamically
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    // Any scroll-based functions can be called here
}, 16));

// Accessibility: Keyboard navigation for hamburger
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Detect low-end devices
const isLowEndDevice = navigator.hardwareConcurrency <= 2 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Reduce animations on low-end devices
if (isLowEndDevice) {
    document.documentElement.style.setProperty('--transition', 'all 0.1s ease');
    document.body.classList.add('low-end');
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        // Preload image
        const imgSrc = img.src;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, { passive: true });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}, { passive: true });

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}, { passive: true });

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}, { passive: true });

// Staggered animations for domain tiles
function animateDomainTiles() {
    const domainTiles = document.querySelectorAll('.domain-tile');
    domainTiles.forEach((tile) => {
        const delay = parseInt(tile.getAttribute('data-delay')) * 0.2; // 0.2s per step
        setTimeout(() => {
            tile.classList.add('animate');
        }, delay * 1000);
    });
}

// Trigger domain animations on scroll
const domainObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateDomainTiles();
            domainObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const hackathonDomains = document.querySelector('.hackathon-domains');
if (hackathonDomains) {
    domainObserver.observe(hackathonDomains);
}
