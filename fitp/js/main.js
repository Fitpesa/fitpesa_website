// FitPesa Main JavaScript

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Modal functionality
    const closeModalBtn = document.getElementById('close-modal');
    const productModal = document.getElementById('product-modal');
    
    if (closeModalBtn && productModal) {
        closeModalBtn.addEventListener('click', function() {
            productModal.classList.add('hidden');
        });

        // Close modal when clicking outside
        productModal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.add('hidden');
            }
        });
    }
});

// Show product modal
function showProductModal(sku) {
    if (typeof PRODUCTS === 'undefined') return;
    
    const product = PRODUCTS.find(p => p.sku === sku);
    if (!product) return;
    
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-price').textContent = `${product.price_fitp} FITP`;
    document.getElementById('modal-description').textContent = product.short;
    
    const detailsContainer = document.getElementById('modal-details');
    detailsContainer.innerHTML = `
        <li>SKU: ${product.sku}</li>
        <li>Category: ${product.category}</li>
        <li>Stock: ${product.stock} available</li>
        <li>Vendor: FitPesa Vendor (demo)</li>
    `;
    
    document.getElementById('product-modal').classList.remove('hidden');
}
