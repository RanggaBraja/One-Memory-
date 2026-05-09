document.addEventListener("DOMContentLoaded", () => {

    // ========== Mobile Menu Toggle ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between list and X
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close menu when clicking a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            });
        });
    }

    // ========== Smooth Scrolling for Anchors ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Intersection Observer for Fade-In Effects ==========
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ========== Navbar Background on Scroll ==========
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
            }
        });
    }

    // ========== Active Nav Link Highlight on Scroll ==========
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNav() {
        const scrollTop = window.pageYOffset;
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                navAnchors.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ========== Order Form WhatsApp Integration ==========
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const boxDesign = document.getElementById('box_design')?.value || '';
            const recipient = document.getElementById('recipient')?.value || '';
            const message = document.getElementById('message')?.value || '';
            const mediaLink = document.getElementById('media_link')?.value || '';

            const waMessage = `Halo One Memory! 🎁Saya ingin memesan:- *Nama Pemesan:* ${name}%0A- *No. WhatsApp:* ${phone}%0A- *Desain Kotak:* ${boxDesign}%0A- *Nama Penerima:* ${recipient}%0A- *Pesan Personal:* ${message || '-'}%0A- *Link Media:* ${mediaLink}%0A%0ATerima kasih!`;

            // Replace with actual WhatsApp number
            const waNumber = '628123456789';
            window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
        });
    }

});
