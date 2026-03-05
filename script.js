// Initialize Lenis for Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
    });
    gsap.to(cursorFollower, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.3
    });
});

// Animations
window.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero Animations
    const tlHero = gsap.timeline();

    tlHero.from('.sub-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
        .from('.title-reveal', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out'
        }, '-=0.4')
        .from('.p-reveal', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-btns.reveal .btn', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4');

    // Stats Counter Animation
    gsap.from('.stat-item h3', {
        scrollTrigger: {
            trigger: '.stats',
            start: 'top 80%',
        },
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Sections Reveal
    const reveals = [
        { selector: '.a-reveal', start: 'top 80%' },
        { selector: '.c-reveal', start: 'top 85%' },
        { selector: '.v-reveal', start: 'top 90%' }
    ];

    reveals.forEach(reveal => {
        gsap.from(reveal.selector, {
            scrollTrigger: {
                trigger: reveal.selector,
                start: reveal.start,
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });

    // Image Accent Animation
    gsap.to('.img-accent', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            scrub: true
        },
        x: 40,
        y: -40,
        duration: 1
    });

});

// Active Link on Scroll
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
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

// Mobile Menu Toggle (Basic)
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
