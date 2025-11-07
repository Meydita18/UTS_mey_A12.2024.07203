// Product Management and Shopping Cart

class ProductManager {
    constructor() {
        this.products = this.loadProducts();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.filters = {
            category: 'all',
            priceRange: [0, 10000000],
            sortBy: 'name',
            search: ''
        };
        this.init();
    }

    init() {
        this.renderProducts();
        this.setupFilters();
        this.setupCart();
        this.setupWishlist();
    }

    // Load sample products
    loadProducts() {
        const products = JSON.parse(localStorage.getItem('products'));
        if (products) return products;

        const sampleProducts = [
            {
                id: 'laptop-001',
                name: 'ASUS ROG Strix G15',
                category: 'laptop',
                price: 15999000,
                originalPrice: 18999000,
                image: 'https://via.placeholder.com/400x400/4F46E5/FFFFFF?text=ASUS+ROG',
                rating: 4.8,
                reviews: 124,
                stock: 15,
                brand: 'ASUS',
                description: 'Laptop gaming high-performance dengan RTX 3060',
                features: ['Intel i7-10750H', '16GB RAM', '512GB SSD', 'RTX 3060'],
                badge: 'hot'
            },
            {
                id: 'laptop-002',
                name: 'Lenovo ThinkPad X1 Carbon',
                category: 'laptop',
                price: 22999000,
                originalPrice: null,
                image: 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=ThinkPad',
                rating: 4.9,
                reviews: 89,
                stock: 8,
                brand: 'Lenovo',
                description: 'Laptop bisnis premium dengan performa luar biasa',
                features: ['Intel i7-1165G7', '16GB RAM', '1TB SSD', '14" 4K'],
                badge: 'new'
            },
            {
                id: 'pc-001',
                name: 'PC Gaming Ryzen 7 5800X',
                category: 'pc',
                price: 18999000,
                originalPrice: 21999000,
                image: 'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=PC+Gaming',
                rating: 4.7,
                reviews: 156,
                stock: 12,
                brand: 'Custom',
                description: 'PC gaming dengan performa tinggi dan RGB',
                features: ['AMD Ryzen 7 5800X', '32GB RAM', 'RTX 3070', '1TB NVMe'],
                badge: 'discount'
            },
            {
                id: 'monitor-001',
                name: 'Samsung Odyssey G7 27"',
                category: 'monitor',
                price: 7999000,
                originalPrice: 9999000,
                image: 'https://via.placeholder.com/400x400/EF4444/FFFFFF?text=Odyssey+G7',
                rating: 4.6,
                reviews: 203,
                stock: 25,
                brand: 'Samsung',
                description: 'Monitor gaming curved dengan refresh rate 240Hz',
                features: ['27" Curved', '2560x1440', '240Hz', 'G-Sync'],
                badge: 'hot'
            },
            {
                id: 'keyboard-001',
                name: 'Razer BlackWidow V3',
                category: 'keyboard',
                price: 2499000,
                originalPrice: null,
                image: 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=BlackWidow',
                rating: 4.5,
                reviews: 178,
                stock: 30,
                brand: 'Razer',
                description: 'Keyboard mekanik gaming dengan RGB Chroma',
                features: ['Mechanical Switches', 'RGB Chroma', 'USB Passthrough', 'Wrist Rest'],
                badge: 'new'
            },
            {
                id: 'mouse-001',
                name: 'Logitech G Pro X Superlight',
                category: 'mouse',
                price: 1899000,
                originalPrice: 2299000,
                image: 'https://via.placeholder.com/400x400/06B6D4/FFFFFF?text=G+Pro+X',
                rating: 4.8,
                reviews: 267,
                stock: 20,
                brand: 'Logitech',
                description: 'Mouse gaming ultra-ringan untuk esports',
                features: ['63g Weight', 'HERO 25K Sensor', 'Wireless', '70H Battery'],
                badge: 'discount'
            },
            {
                id: 'headset-001',
                name: 'SteelSeries Arctis Pro',
                category: 'headset',
                price: 3999000,
                originalPrice: null,
                image: 'https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Arctis+Pro',
                rating: 4.7,
                reviews: 145,
                stock: 18,
                brand: 'SteelSeries',
                description: 'Headset gaming premium dengan Hi-Res audio',
                features: ['Hi-Res Audio', 'DTS Headphone:X', 'ClearCast Mic', 'RGB'],
                badge: 'hot'
            },
            {
                id: 'laptop-003',
                name: 'MSI GF63 Thin',
                category: 'laptop',
                price: 12999000,
                originalPrice: 14999000,
                image: 'https://via.placeholder.com/400x400/84CC16/FFFFFF?text=GF63+Thin',
                rating: 4.4,
                reviews: 92,
                stock: 22,
                brand: 'MSI',
                description: 'Laptop gaming tipis dengan GTX 1650',
                features: ['Intel i5-10500H', '8GB RAM', '512GB SSD', 'GTX 1650'],
                badge: 'discount'
            }
        ];

        localStorage.setItem('products', JSON.stringify(sampleProducts));
        return sampleProducts;
    }

    // Render products
    renderProducts() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        const filteredProducts = this.filterProducts();
        
        productGrid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
        
        // Add event listeners to product cards
        this.setupProductCardEvents();
    }

    createProductCard(product) {
        const discount = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" data-aos="fade-up" data-aos-delay="${Math.floor(Math.random() * 200)}">
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-badge">
                        ${product.badge === 'new' ? '<span class="badge-new">Baru</span>' : ''}
                        ${product.badge === 'hot' ? '<span class="badge-discount">Hot</span>' : ''}
                        ${product.badge === 'discount' && discount > 0 ? `<span class="badge-discount">-${discount}%</span>` : ''}
                    </div>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <div class="product-overlay">
                            <button class="btn-quick-view" title="Lihat Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-wishlist" title="Tambah ke Wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-content">
                        <h5 class="product-title">${product.name}</h5>
                        <div class="product-rating">
                            <div class="stars">
                                ${this.generateStars(product.rating)}
                            </div>
                            <span class="rating-text">${product.rating} (${product.reviews})</span>
                        </div>
                        <div class="product-price">
                            <span class="price-current">Rp ${this.formatPrice(product.price)}</span>
                            ${product.originalPrice ? `<span class="price-original">Rp ${this.formatPrice(product.originalPrice)}</span>` : ''}
                        </div>
                        <div class="product-stock">
                            <span class="text-success">${product.stock} tersedia</span>
                        </div>
                        <button class="btn btn-primary btn-add-cart w-100 mt-2">
                            <i class="fas fa-shopping-cart me-2"></i>Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    formatPrice(price) {
        return price.toLocaleString('id-ID');
    }

    // Filter products
    filterProducts() {
        let filtered = [...this.products];

        // Category filter
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === this.filters.category);
        }

        // Price range filter
        filtered = filtered.filter(product => 
            product.price >= this.filters.priceRange[0] && 
            product.price <= this.filters.priceRange[1]
        );

        // Search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            switch (this.filters.sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }

    // Setup filters
    setupFilters() {
        // Category filter
        const categoryFilters = document.querySelectorAll('[data-filter="category"]');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                this.filters.category = filter.dataset.category;
                this.updateActiveFilter(categoryFilters, filter);
                this.renderProducts();
            });
        });

        // Price range filter
        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.filters.priceRange[1] = value;
                document.getElementById('priceRangeValue').textContent = `Rp ${this.formatPrice(value)}`;
                this.renderProducts();
            });
        }

        // Sort filter
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.filters.sortBy = e.target.value;
                this.renderProducts();
            });
        }

        // Search filter
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.renderProducts();
            });
        }
    }

    updateActiveFilter(filters, activeFilter) {
        filters.forEach(filter => filter.classList.remove('active'));
        activeFilter.classList.add('active');
    }

    // Setup product card events
    setupProductCardEvents() {
        // Quick view buttons
        document.querySelectorAll('.btn-quick-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const productId = productCard.dataset.productId;
                this.showQuickView(productId);
            });
        });

        // Wishlist buttons
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const productId = productCard.dataset.productId;
                this.toggleWishlist(productId, btn);
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const productId = productCard.dataset.productId;
                this.addToCart(productId, btn);
            });
        });

        // Update wishlist button states
        this.updateWishlistButtons();
    }

    // Quick view functionality
    showQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content modal-content-custom">
                    <div class="modal-header modal-header-custom">
                        <h5 class="modal-title">${product.name}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
                            </div>
                            <div class="col-md-6">
                                <div class="product-rating mb-3">
                                    <div class="stars">
                                        ${this.generateStars(product.rating)}
                                    </div>
                                    <span class="rating-text">${product.rating} (${product.reviews} ulasan)</span>
                                </div>
                                <div class="product-price mb-3">
                                    <span class="price-current fs-3">Rp ${this.formatPrice(product.price)}</span>
                                    ${product.originalPrice ? `<span class="price-original fs-5">Rp ${this.formatPrice(product.originalPrice)}</span>` : ''}
                                </div>
                                <p class="product-description mb-3">${product.description}</p>
                                <div class="product-features mb-3">
                                    <h6>Fitur Utama:</h6>
                                    <ul class="list-unstyled">
                                        ${product.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="product-stock mb-3">
                                    <span class="text-success">${product.stock} unit tersedia</span>
                                </div>
                                <div class="product-actions">
                                    <button class="btn btn-primary btn-lg btn-add-cart w-100 mb-2" data-product-id="${product.id}">
                                        <i class="fas fa-shopping-cart me-2"></i>Tambah ke Keranjang
                                    </button>
                                    <button class="btn btn-outline-primary btn-wishlist w-100" data-product-id="${product.id}">
                                        <i class="far fa-heart me-2"></i>Tambah ke Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Setup quick view events
        modal.querySelector('.btn-add-cart').addEventListener('click', (e) => {
            this.addToCart(productId, e.target);
            bootstrapModal.hide();
        });

        modal.querySelector('.btn-wishlist').addEventListener('click', (e) => {
            this.toggleWishlist(productId, e.target);
        });

        // Remove modal from DOM when hidden
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }

    // Wishlist functionality
    setupWishlist() {
        this.updateWishlistButtons();
    }

    toggleWishlist(productId, button) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = wishlist.indexOf(productId);

        if (index > -1) {
            wishlist.splice(index, 1);
            button.innerHTML = '<i class="far fa-heart me-2"></i>Tambah ke Wishlist';
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
            this.showNotification('Produk dihapus dari wishlist', 'info');
        } else {
            wishlist.push(productId);
            button.innerHTML = '<i class="fas fa-heart me-2"></i>Hapus dari Wishlist';
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
            this.showNotification('Produk ditambahkan ke wishlist!', 'success');
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    updateWishlistButtons() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            const productCard = btn.closest('.product-card') || btn.closest('.modal-content');
            const productId = productCard.querySelector('[data-product-id]').dataset.productId;
            
            if (wishlist.includes(productId)) {
                btn.innerHTML = btn.classList.contains('btn-primary') ? 
                    '<i class="fas fa-heart"></i>' : 
                    '<i class="fas fa-heart me-2"></i>Hapus dari Wishlist';
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');
            } else {
                btn.innerHTML = btn.classList.contains('btn-primary') ? 
                    '<i class="far fa-heart"></i>' : 
                    '<i class="far fa-heart me-2"></i>Tambah ke Wishlist';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            }
        });
    }

    // Cart functionality
    setupCart() {
        this.updateCartCount();
    }

    addToCart(productId, button) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
        this.animateCartButton(button);
        this.showNotification(`${product.name} ditambahkan ke keranjang!`, 'success');
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    animateCartButton(button) {
        button.classList.add('animate-click-ripple');
        setTimeout(() => {
            button.classList.remove('animate-click-ripple');
        }, 600);

        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.classList.add('animate-bounce');
            setTimeout(() => {
                cartBtn.classList.remove('animate-bounce');
            }, 1000);
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-custom`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)} alert-icon"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        `;

        // Insert at top of page
        const container = document.querySelector('.container') || document.body;
        container.insertBefore(notification, container.firstChild);

        // Auto remove
        setTimeout(() => {
            notification.remove();
        }, 5000);
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
}

// Initialize ProductManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.product-grid')) {
        new ProductManager();
    }
});
