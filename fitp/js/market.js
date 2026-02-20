// Market page functionality
let currentPage = 1;
const perPage = 12;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('products-container')) {
        initMarketPage();
    }
});

function initMarketPage() {
    renderProducts();
    setupEventListeners();
}

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentPage = 1;
            renderProducts();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentPage = 1;
            renderProducts();
        });
    }
}

function renderProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    
    // Filter products
    let filtered = PRODUCTS;
    
    if (categoryFilter !== 'All') {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }
    
    if (searchInput) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchInput) || 
            p.short.toLowerCase().includes(searchInput)
        );
    }
    
    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const startIndex = (currentPage - 1) * perPage;
    const pageItems = filtered.slice(startIndex, startIndex + perPage);
    
    // Render products
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    if (pageItems.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">No products found matching your search.</div>';
        document.getElementById('pagination').innerHTML = '';
        return;
    }
    
    pageItems.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'border rounded-lg overflow-hidden bg-white shadow-sm product-card cursor-pointer';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-44 object-cover">
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                        <h4 class="font-semibold text-sm">${product.title}</h4>
                        <div class="text-xs text-gray-500 mt-1">${product.category}</div>
                    </div>
                    <div class="text-red-600 font-bold text-sm ml-2">${product.price_fitp} FITP</div>
                </div>
                <p class="text-sm text-gray-600 mt-2 line-clamp-2">${product.short}</p>
                <div class="mt-4 flex gap-2">
                    <button class="view-product flex-1 px-3 py-2 border rounded-md text-sm hover:bg-gray-50 transition" data-sku="${product.sku}">View</button>
                    <button class="buy-product px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition">Buy</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const sku = this.getAttribute('data-sku');
            showProductModal(sku);
        });
    });
    
    // Add event listeners to buy buttons
    document.querySelectorAll('.buy-product').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Added to cart! (Demo feature - coming soon in the app)');
        });
    });
    
    // Render pagination
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    paginationContainer.innerHTML = `
        <button id="prev-page" class="px-4 py-2 border rounded hover:bg-gray-50 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left mr-1"></i> Prev
        </button>
        <div class="px-4 py-2">Page ${currentPage} of ${totalPages}</div>
        <button id="next-page" class="px-4 py-2 border rounded hover:bg-gray-50 transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right ml-1"></i>
        </button>
    `;
    
    // Add event listeners
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}
