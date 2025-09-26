// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down - hide navbar
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up - show navbar
    navbar.style.transform = 'translateY(0)';
  }

  // Add background blur when scrolled
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollTop = scrollTop;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Elements to animate
const animateElements = document.querySelectorAll(
  '.feature-card, .pipeline-stage, .deployment-item, .stat-item'
);
animateElements.forEach((el) => {
  el.classList.add('animate-element');
  observer.observe(el);
});

// Pipeline step animation
const pipelineSteps = document.querySelectorAll('.pipeline-step');
let currentStep = 0;

function animatePipeline() {
  pipelineSteps.forEach((step, index) => {
    step.classList.remove('active');
    if (index <= currentStep) {
      step.classList.add('active');
    }
  });

  currentStep = (currentStep + 1) % pipelineSteps.length;
}

// Start pipeline animation when visible
const pipelineDiagram = document.querySelector('.pipeline-diagram');
if (pipelineDiagram) {
  const pipelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInterval(animatePipeline, 2000);
          pipelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  pipelineObserver.observe(pipelineDiagram);
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (
      (increment > 0 && current >= target) ||
      (increment < 0 && current <= target)
    ) {
      current = target;
      clearInterval(timer);
    }

    // Format the number based on target
    if (typeof target === 'string') {
      element.textContent = target;
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animate statistics when visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach((stat) => {
          const text = stat.textContent;
          if (text.includes('%')) {
            const number = parseFloat(text);
            stat.textContent = '0%';
            setTimeout(() => animateCounter(stat, text), 500);
          } else if (text.includes('min')) {
            stat.textContent = '10min';
            setTimeout(() => animateCounter(stat, text), 500);
          } else if (text.includes('/')) {
            stat.textContent = '0/0';
            setTimeout(() => animateCounter(stat, text), 500);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => typeWriter(heroTitle, originalText, 50), 1000);
  }
});

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Button click effects
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Animate elements on load
  setTimeout(() => {
    document.querySelectorAll('.animate-element').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 100);
    });
  }, 500);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  'scroll',
  throttle(() => {
    // Scroll-based animations can go here
  }, 16)
);

// Add CSS for animations that couldn't be included in the main CSS
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .pipeline-step {
        transition: all 0.3s ease;
    }
    
    .pipeline-step.active {
        transform: scale(1.1);
        box-shadow: 0 10px 30px rgba(211, 56, 51, 0.3);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(15, 23, 42, 0.98);
        backdrop-filter: blur(10px);
        padding: var(--spacing-lg);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;

document.head.appendChild(style);

// Console welcome message
console.log(`
🚀 Jenkins CI/CD Pipeline Project
Built with modern web technologies and DevOps practices

Features:
- Responsive design
- Smooth animations
- Interactive elements
- Modern CSS Grid & Flexbox
- Performance optimized

Repository: https://github.com/ahmed22362/jinkens_deploy
`);
