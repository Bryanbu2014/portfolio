// Hero Sequential Animation
(function() {
    const imgWrap  = document.getElementById('hero-img-wrap');
    const h1       = document.getElementById('hero-h1');
    const heroPara = document.getElementById('hero-p');
    const heroBtn  = document.getElementById('hero-btn');
    const twEl     = document.getElementById('typewriter-text');
    const cursor   = document.getElementById('typewriter-cursor');
    const twText   = "I'm an Artificial Intelligence student, eager to explore the vast possibilities of AI and passionate about learning how to build robust software solutions powered by AI.";

    if (!imgWrap || !h1 || !heroPara || !heroBtn || !twEl || !cursor) return;

    function skipToEnd() {
        imgWrap.style.opacity   = '1';
        imgWrap.style.transform = 'scale(1)';
        h1.style.opacity        = '1';
        h1.style.transform      = 'translateY(0)';
        twEl.textContent        = twText;
        cursor.style.display    = 'none';
        heroPara.style.opacity  = '1';
        heroBtn.style.opacity   = '1';
        heroBtn.style.transform = 'scale(1)';
    }

    if (sessionStorage.getItem('animationsPlayed') === 'true') {
        skipToEnd();
        return;
    }

    let i = 0;
    function type() {
        if (i < twText.length) {
            twEl.textContent += twText.charAt(i++);
            setTimeout(type, 20);
        } else {
            setTimeout(() => {
                cursor.style.display = 'none';
                heroBtn.classList.add('active');   // 4. Pop in button
            }, 500);
        }
    }

    // 1. Pop in picture
    setTimeout(() => imgWrap.classList.add('active'), 100);

    // 2. Rise in heading
    setTimeout(() => h1.classList.add('active'), 550);

    // 3. Fade in paragraph, then start typewriter
    setTimeout(() => {
        heroPara.style.opacity = '1';
        type();
    }, 1100);
})();

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navbarPill = document.getElementById('navbarPill');

if (navToggle && navbarPill) {
    navToggle.addEventListener('click', () => {
        navbarPill.classList.toggle('mobile-active');
        const icon = navToggle.querySelector('i');
        if(navbarPill.classList.contains('mobile-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close sidebar when clicking a link (mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768) {
            navbarPill.classList.remove('mobile-active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Copy email logic
const copyEmailBtn = document.getElementById('copyEmailBtn');
const notification = document.getElementById('copyNotification');
const email = 'bubryanwb@gmail.com';

if (copyEmailBtn && notification) {
    copyEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        });
    });
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Load More / Show Less Projects Logic
const loadMoreBtn = document.getElementById('loadMoreProjects');
const showLessBtn = document.getElementById('showLessProjects');
const hiddenProjects = document.querySelectorAll('.hidden-project');

// Check if projects were previously expanded
if (sessionStorage.getItem('projectsExpanded') === 'true') {
    hiddenProjects.forEach(p => {
        p.style.display = 'block';
        p.style.animationDelay = '0s';
        p.classList.add('reveal', 'active');
    });
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    if (showLessBtn) showLessBtn.style.display = 'block';
}

if(loadMoreBtn) {
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let loadedCount = 0;
        const projectsToLoad = 3;

        for(let i = 0; i < hiddenProjects.length; i++) {
            // Check computed style to handle initial CSS hiding
            if(window.getComputedStyle(hiddenProjects[i]).display === 'none') {
                hiddenProjects[i].style.display = 'block';
                // Clear any inline overrides that might have been set by the page load observer
                hiddenProjects[i].style.animation = '';
                hiddenProjects[i].style.opacity = '';
                hiddenProjects[i].style.transform = '';
                hiddenProjects[i].style.animationDelay = `${loadedCount * 0.15}s`;
                
                hiddenProjects[i].classList.add('reveal');
                void hiddenProjects[i].offsetWidth; // force reflow
                hiddenProjects[i].classList.add('active');
                loadedCount++;
            }
            if(loadedCount === projectsToLoad) break;
        }

        const remainingHidden = Array.from(hiddenProjects).filter(p => window.getComputedStyle(p).display === 'none').length;
        if(remainingHidden === 0) {
            loadMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'block';
        }
        
        sessionStorage.setItem('projectsExpanded', 'true');
    });
}

if(showLessBtn) {
    showLessBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hiddenProjects.forEach(p => {
            p.style.display = 'none';
            p.classList.remove('active');
            p.classList.remove('reveal');
            // Clear all inline styles that might have been added by the "animationsPlayed" logic
            p.style.animation = '';
            p.style.opacity = '';
            p.style.transform = '';
            p.style.animationDelay = '';
        });
        
        showLessBtn.style.display = 'none';
        loadMoreBtn.style.display = 'block';
        sessionStorage.setItem('projectsExpanded', 'false');
        
        // Scroll back up to the projects section nicely
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
}

// Intersection Observer for Reveal Animations
const revealObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

// Check animation state
const animationsPlayed = sessionStorage.getItem('animationsPlayed') === 'true';
const isLandingPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('portfolio/');

document.querySelectorAll('.reveal').forEach((el) => {
    if (animationsPlayed && isLandingPage) {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.classList.add('active');
    } else {
        revealObserver.observe(el);
    }
});

// Mark as played only on landing page to allow normal animations on project pages
if (isLandingPage) {
    sessionStorage.setItem('animationsPlayed', 'true');
}



// Global Event Listeners for Navigation
document.addEventListener('click', (e) => {
    // 1. Home Button Logic
    const homeBtn = e.target.closest('.home-btn-corner');
    if (homeBtn) {
        sessionStorage.removeItem('projectsExpanded');
        sessionStorage.removeItem('animationsPlayed');
        
        // If we are already on index.html, just clear state and reload/scroll
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('portfolio/')) {
            e.preventDefault();
            window.location.href = window.location.pathname;
        }
    }

    // 2. Go Back Logic
    const backBtn = e.target.closest('a[href="#"]');
    if (backBtn && (backBtn.textContent.includes('Go Back') || backBtn.querySelector('.fa-arrow-left') || backBtn.textContent.includes('RETURN'))) {
        e.preventDefault();
        window.history.back();
    }

    // 3. Version History Accordion Logic
    const versionHeader = e.target.closest('.version-header');
    if (versionHeader) {
        const block = versionHeader.closest('.version-block');
        block.classList.toggle('collapsed');
    }

    // 4. Image Modal Logic
    const clickableImage = e.target.closest('.clickable-image');
    if (clickableImage) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('globalImageModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'globalImageModal';
            modal.className = 'image-modal';
            modal.innerHTML = `
                <span class="image-modal-close">&times;</span>
                <img class="image-modal-content" id="globalImageModalImg">
            `;
            document.body.appendChild(modal);
        }
        
        const modalImg = document.getElementById('globalImageModalImg');
        modalImg.src = clickableImage.src;
        modalImg.alt = clickableImage.alt;
        
        // Show modal with slight delay to allow display:flex to apply before opacity transition
        modal.style.display = 'flex';
        // Force reflow
        void modal.offsetWidth;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    const modalClose = e.target.closest('.image-modal-close');
    const modalBackground = e.target.id === 'globalImageModal';
    if (modalClose || modalBackground) {
        const modal = document.getElementById('globalImageModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Wait for transition to finish before hiding
            setTimeout(() => {
                if (!modal.classList.contains('show')) {
                    modal.style.display = 'none';
                }
            }, 300);
        }
    }
});
