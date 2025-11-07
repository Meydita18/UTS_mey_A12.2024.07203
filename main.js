// Main JavaScript for E-Commerce Website

class ECommerceApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.init();
    }

    init() {
        this.initLoadingScreen();
        this.initNavigation();
        this.initCart();
        this.initSearch();
        this.initAnimations();
        this.initScrollEffects();
        this.initBackToTop();
        this.initProductInteractions();
        this.initNewsletter();
        this.initCounterAnimations();
        this.initMobileMenu();
        this.initParallax();
        this.initLazyLoading();
    }

    // Loading Screen
    initLoadingScreen() {
        window.addEventListener('load', () => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.classList.add('loaded');
                    }, 500);
                }, 1500);
            }
        });
    }

    // Navigation
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Smooth scrolling for anchor links
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
    }

    // Mobile Menu
    initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                navbarCollapse.classList.toggle('show');
                navbarToggler.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.remove('active');
                }
            });

            // Close menu when clicking on links
            navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.remove('active');
                });
            });
        }
    }

    // Cart Functionality
    initCart() {
        this.updateCartCount();
        this.setupCartButtons();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    setupCartButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-cart')) {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.productId;
                const productName = productCard.querySelector('.product-title').textContent;
                const productPrice = parseFloat(productCard.querySelector('.price-current').textContent.replace(/[^0-9.-]+/g, ""));
                const productImage = productCard.querySelector('.product-image img').src;

                this.addToCart(productId, productName, productPrice, productImage);
                this.animateCartButton(e.target);
            }
        });
    }

    addToCart(productId, name, price, image) {
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.showNotification(`${name} ditambahkan ke keranjang!`, 'success');
    }

    animateCartButton(button) {
        button.classList.add('animate-click-ripple');
        setTimeout(() => {
            button.classList.remove('animate-click-ripple');
        }, 600);

        // Cart bounce animation
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.classList.add('animate-bounce');
            setTimeout(() => {
                cartBtn.classList.remove('animate-bounce');
            }, 1000);
        }
    }

    // Search Functionality
    initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value);
                }
            });

            // Search suggestions
            searchInput.addEventListener('input', (e) => {
                this.showSearchSuggestions(e.target.value);
            });
        }
    }

    performSearch(query) {
        if (query.trim()) {
            this.showNotification(`Mencari: ${query}`, 'info');
            // Implement search functionality here
            // This could redirect to a search results page or filter products
        }
    }

    showSearchSuggestions(query) {
        // Implement search suggestions here
        // This could show a dropdown with suggestions based on the query
    }

    // Animations
    initAnimations() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Initialize Swiper for product carousel
        this.initProductCarousel();

        // Initialize custom animations
        this.initCustomAnimations();
    }

    initProductCarousel() {
        const productSwiper = document.querySelector('.product-swiper');
        if (productSwiper && typeof Swiper !== 'undefined') {
            new Swiper('.product-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                },
            });
        }
    }

    initCustomAnimations() {
        // Staggered animations for category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Parallax effect for floating shapes
        this.initParallax();
    }

    // Scroll Effects
    initScrollEffects() {
        // Counter animation on scroll
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.7
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

        // Fade in on scroll
        const fadeElements = document.querySelectorAll('.animate-on-scroll');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }

    // Counter Animations
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }

    // Back to Top Button
    initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Product Interactions
    initProductInteractions() {
        // Wishlist functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-wishlist')) {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.productId;
                
                this.toggleWishlist(productId, e.target);
            }
        });

        // Quick view functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-quick-view')) {
                const productCard = e.target.closest('.product-card');
                this.showQuickView(productCard);
            }
        });

        // Product rating hover effects
        document.querySelectorAll('.product-rating').forEach(rating => {
            rating.addEventListener('mouseenter', () => {
                rating.classList.add('animate-pulse');
            });
            
            rating.addEventListener('mouseleave', () => {
                rating.classList.remove('animate-pulse');
            });
        });
    }

    toggleWishlist(productId, button) {
        const isInWishlist = this.wishlist.includes(productId);
        
        if (isInWishlist) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
            button.classList.remove('active');
            button.innerHTML = '<i class="far fa-heart"></i>';
            this.showNotification('Produk dihapus dari wishlist', 'info');
        } else {
            this.wishlist.push(productId);
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-heart"></i>';
            this.showNotification('Produk ditambahkan ke wishlist!', 'success');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    showQuickView(productCard) {
        // Implement quick view modal here
        this.showNotification('Quick view akan segera tersedia!', 'info');
    }

    // Newsletter
    initNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                if (this.validateEmail(email)) {
                    this.subscribeNewsletter(email);
                } else {
                    this.showNotification('Email tidak valid!', 'error');
                }
            });
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    subscribeNewsletter(email) {
        // Simulate API call
        const submitBtn = document.querySelector('.newsletter-form .btn-light');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.showNotification('Berhasil berlangganan newsletter!', 'success');
            document.querySelector('.newsletter-form input[type="email"]').value = '';
        }, 2000);
    }

    // Parallax Effects
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.classList.contains('parallax-slow') ? 0.5 :
                                 element.classList.contains('parallax-medium') ? 0.7 : 0.9;
                    
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    }

    // Lazy Loading
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            info: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
        };
        return colors[type] || colors.info;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ECommerceApp();
});

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
