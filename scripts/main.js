if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.onload = function() {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
    
    adjustFontSize();
    
    initBitcoinAnimation();
    
    initMobileMenu();
    
    initAccordion();
    
    initCharts();
    
    initSmoothScrolling();
    
    initStickyNav();
    
    initCardCarousel();
});

function adjustFontSize() {
    const setFontSize = () => {
        const html = document.documentElement;
        
        if (window.innerWidth >= 1400) {
            html.style.fontSize = '10px';
        } else if (window.innerWidth >= 1025) {
            html.style.fontSize = '11px';
        } else if (window.innerWidth >= 769) {
            html.style.fontSize = '12px';
        } else if (window.innerWidth >= 577) {
            html.style.fontSize = '13px';
        } else {
            html.style.fontSize = 'clamp(11px, 4vw, 13px)';
        }
    };
    
    setFontSize();
    
    window.addEventListener('resize', setFontSize);
}

function initBitcoinAnimation() {
    const canvas = document.getElementById('bitcoinCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const headerAnimation = document.querySelector('.header-animation');
        if (headerAnimation) {
            canvas.width = headerAnimation.offsetWidth;
            canvas.height = headerAnimation.offsetHeight;
        } else {
            canvas.width = window.innerWidth;
            canvas.height = 500;
        }
    }
    
    resizeCanvas();
    
    function animate() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', function() {
        resizeCanvas();
    });
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuBtn.querySelectorAll('span').forEach(span => span.classList.remove('active'));
        });
    });
}

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
    
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
}

function initCharts() {
    const dollarGoldChart = document.getElementById('dollar-gold-chart');
    const bitcoinDollarChart = document.getElementById('bitcoin-dollar-chart');
    
    if (!dollarGoldChart || !bitcoinDollarChart) return;
    
    const dollarGoldCtx = dollarGoldChart.getContext('2d');
    
    const goldPrices = [34.72, 35.27, 35.94, 615, 383, 279, 1224, 1895, 2000];
    const years = ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2025'];
    
    const dollarGoldPurchasingPower = goldPrices.map(price => (goldPrices[0] / price) * 100);
    
    new Chart(dollarGoldCtx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Kaufkraft USD in Bitcoin',
                    data: dollarGoldPurchasingPower,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Kaufkraftverlust des US-Dollars gegenüber Bitcoin'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Kaufkraft (% von 1950)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
    const bitcoinDollarCtx = bitcoinDollarChart.getContext('2d');
    
    const bitcoinYears = ['2010', '2011', '2013', '2015', '2017', '2019', '2021', '2023', '2025'];
    const bitcoinPrices = [0.08, 1, 100, 300, 20000, 8000, 69000, 42000, 80000];
    
    new Chart(bitcoinDollarCtx, {
        type: 'line',
        data: {
            labels: bitcoinYears,
            datasets: [
                {
                    label: 'Bitcoin Preis in USD',
                    data: bitcoinPrices,
                    borderColor: '#f7931a',
                    backgroundColor: 'rgba(247, 147, 26, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Bitcoin Preisentwicklung in USD'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} USD`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Preis in USD (logarithmisch)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value === 0.1) return '$0.1';
                            if (value === 1) return '$1';
                            if (value === 10) return '$10';
                            if (value === 100) return '$100';
                            if (value === 1000) return '$1K';
                            if (value === 10000) return '$10K';
                            if (value === 100000) return '$100K';
                            return '';
                        }
                    }
                }
            }
        }
    });
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                
                let offsetAdjustment = 0;
                
                if (targetId === '#was-ist-geld') {
                    offsetAdjustment = 0;
                }
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - offsetAdjustment;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initStickyNav() {
    const nav = document.querySelector('.main-nav');
    const hero = document.querySelector('.hero');
    
    if (!nav || !hero) return;
    
    const navHeight = nav.offsetHeight;
    const heroHeight = hero.offsetHeight - navHeight;
    
    function checkScroll() {
        if (window.scrollY > heroHeight) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = [
        '.feature-list li',
        '.timeline-item',
        '.feature-card',
        '.quote-card',
        '.interactive-card',
        '.comparison-table tr',
        '.carousel-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    initScrollAnimations();
});

const propertyCards = document.querySelectorAll('.property');
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.03,
            backgroundColor: '#f8fafc',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            backgroundColor: '#f8f9fa',
            boxShadow: 'none',
            duration: 0.3
        });
    });
});

function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.from('.header-content h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.header-content .subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.2')
    .from('.header-content .hero-quote', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.header-content .scroll-button', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.2');
}

window.addEventListener('load', initHeroAnimations);

function initScrollTriggerAnimations() {
    if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            gsap.from(section.querySelector('.section-title'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                duration: 0.8
            });
        });
    }
}

window.addEventListener('load', initScrollTriggerAnimations);

const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            color: '#f7931a',
            duration: 0.3
        });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            color: '#333333',
            duration: 0.3
        });
    });
});

window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.message);
    return true;
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent || `Button ${index + 1}`);
        }
    });
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header) => {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', header.parentElement.classList.contains('active'));
        
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
                header.setAttribute('aria-expanded', header.parentElement.classList.contains('active'));
            }
        });
    });
});

// Card Carousel Functionality
function initCardCarousel() {
    const carousel = document.querySelector('.card-carousel');
    if (!carousel) return;
    
    const cardContainer = carousel.querySelector('.card-container');
    const cards = carousel.querySelectorAll('.carousel-card');
    
    if (cards.length === 0) return;
    
    let hasScrolledToView = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasScrolledToView) {
                hasScrolledToView = true;
                
                if (cardContainer.scrollWidth > carousel.clientWidth) {
                    const firstCard = cards[0];
                    firstCard.scrollIntoView({
                        behavior: 'auto',
                        inline: 'start'
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(carousel);
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}