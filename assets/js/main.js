// Main navigation and project interactions
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile menu toggle (kept for compatibility if a menu button is added later)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function () {
            const navList = document.querySelector('nav ul');
            if (navList) navList.classList.toggle('active');
        });
    }

    // Mark the current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(function (link) {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPage === currentPage) link.classList.add('active');
    });

    // Initialize every project carousel independently
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
        const slides = Array.from(carousel.querySelectorAll('.carousel-image'));
        const counter = carousel.querySelector('.carousel-counter');
        const previousButton = carousel.querySelector('[data-direction="-1"]');
        const nextButton = carousel.querySelector('[data-direction="1"]');

        if (!slides.length || !counter || !previousButton || !nextButton) return;

        let currentIndex = 0;

        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach(function (slide, slideIndex) {
                const isActive = slideIndex === currentIndex;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
            });

            counter.textContent = (currentIndex + 1) + ' / ' + slides.length;
        }

        previousButton.addEventListener('click', function () {
            showSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', function () {
            showSlide(currentIndex + 1);
        });

        showSlide(0);
    });
});
