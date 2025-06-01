// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = {
        items: [],
        total: 0
    };

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-card button');
    const cartTotal = document.querySelector('.cart-btn + span');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.text-xl.font-bold').textContent;
            const price = parseFloat(priceText.replace('$', ''));

            // Add to cart
            cart.items.push({
                name: productName,
                price: price
            });
            cart.total += price;

            // Update cart total
            if (cartTotal) {
                cartTotal.textContent = `$${cart.total.toFixed(2)}`;
            }

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-500';
            successMessage.textContent = 'Added to cart!';
            document.body.appendChild(successMessage);

            // Remove success message after 2 seconds
            setTimeout(() => {
                successMessage.style.transform = 'translateY(100%)';
                successMessage.style.opacity = '0';
                setTimeout(() => successMessage.remove(), 500);
            }, 2000);

            // Animate button
            this.classList.add('scale-95', 'opacity-75');
            setTimeout(() => {
                this.classList.remove('scale-95', 'opacity-75');
            }, 200);
        });
    });

    // Product image hover effect
    const productImages = document.querySelectorAll('.product-card img');
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Add success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing! 🌿';
                successMessage.className = 'text-green-400 mt-4';
                this.appendChild(successMessage);
                
                // Reset form
                emailInput.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 300);
                }, 3000);
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            // Add your search logic here
            console.log('Searching for:', e.target.value);
        }, 300));
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and product cards
    document.querySelectorAll('section, .product-card').forEach(el => {
        el.classList.add('opacity-0');
        observer.observe(el);
    });
});

// Utility function for debouncing
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