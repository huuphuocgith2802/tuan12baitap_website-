/**
 * TUẦN 12: DATA MANAGEMENT - THE SMART CATALOG CONTROLLER
 * Project: The Smart Catalog (TechZone Electronics)
 * Author: Huỳnh Hữu Phước (MSSV: 125000155) - Đại học Lạc Hồng
 * File: challenge/smart_catalog.js
 */

// STATE MANAGEMENT
const state = {
  products: [...productsData],
  searchKeyword: '',
  selectedCategory: 'all',
  priceBracket: 'all', // 'all', 'under5m', '5m-15m', '15m-30m', 'over30m'
  onlySale: false,
  sortBy: 'featured', // 'featured', 'price-asc', 'price-desc', 'name-asc', 'rating-desc'
  cart: []
};

// DOM ELEMENTS CACHE
const DOM = {
  catalogGrid: document.getElementById('catalog-grid'),
  searchInput: document.getElementById('search-catalog-input'),
  clearSearchBtn: document.getElementById('btn-clear-catalog-search'),
  categoryPills: document.querySelectorAll('.cat-pill'),
  priceBracketSelect: document.getElementById('price-bracket-select'),
  saleToggle: document.getElementById('sale-only-toggle'),
  sortSelect: document.getElementById('sort-catalog-select'),
  resetFiltersBtn: document.getElementById('btn-reset-filters'),
  
  // Stats
  matchCount: document.getElementById('catalog-match-count'),
  totalCatalogCount: document.getElementById('catalog-total-count'),
  stockValue: document.getElementById('catalog-stock-value'),

  // Quick View Modal
  modalBackdrop: document.getElementById('quick-view-modal'),
  modalBody: document.getElementById('modal-content-body'),
  modalCloseBtn: document.getElementById('modal-close-btn'),

  // Cart Drawer
  cartDrawer: document.getElementById('cart-drawer'),
  cartDrawerBackdrop: document.getElementById('cart-backdrop'),
  cartToggleBtn: document.getElementById('btn-open-cart'),
  cartCloseBtn: document.getElementById('btn-close-cart'),
  cartBadge: document.getElementById('cart-badge-count'),
  cartItemsContainer: document.getElementById('cart-drawer-items'),
  cartTotalAmount: document.getElementById('cart-drawer-total')
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initCatalog();
  bindEvents();
});

function initCatalog() {
  if (DOM.totalCatalogCount) {
    DOM.totalCatalogCount.textContent = productsData.length;
  }
  applyFiltersAndRender();
  updateTotalStockValue();
}

// BIND ALL UI EVENTS
function bindEvents() {
  // 1. Search Box with real-time input event
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchKeyword = e.target.value.trim().toLowerCase();
    DOM.clearSearchBtn.style.display = state.searchKeyword ? 'block' : 'none';
    applyFiltersAndRender();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchKeyword = '';
    DOM.clearSearchBtn.style.display = 'none';
    applyFiltersAndRender();
    DOM.searchInput.focus();
  });

  // 2. Category Selection Pills
  DOM.categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      DOM.categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedCategory = pill.getAttribute('data-category');
      applyFiltersAndRender();
    });
  });

  // 3. Price Bracket
  if (DOM.priceBracketSelect) {
    DOM.priceBracketSelect.addEventListener('change', (e) => {
      state.priceBracket = e.target.value;
      applyFiltersAndRender();
    });
  }

  // 4. Sale Only Toggle
  if (DOM.saleToggle) {
    DOM.saleToggle.addEventListener('change', (e) => {
      state.onlySale = e.target.checked;
      applyFiltersAndRender();
    });
  }

  // 5. Sort Selector
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // 6. Reset Filters Button
  if (DOM.resetFiltersBtn) {
    DOM.resetFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // 7. Modal Close Events
  if (DOM.modalCloseBtn) {
    DOM.modalCloseBtn.addEventListener('click', closeQuickViewModal);
  }
  if (DOM.modalBackdrop) {
    DOM.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.modalBackdrop) closeQuickViewModal();
    });
  }

  // 8. Cart Drawer Toggle Events
  if (DOM.cartToggleBtn) {
    DOM.cartToggleBtn.addEventListener('click', openCartDrawer);
  }
  if (DOM.cartCloseBtn) {
    DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
  }
  if (DOM.cartDrawerBackdrop) {
    DOM.cartDrawerBackdrop.addEventListener('click', closeCartDrawer);
  }

  // Keyboard Escape to close Modal/Drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickViewModal();
      closeCartDrawer();
    }
  });
}

// CORE FILTERING & SORTING PIPELINE
function applyFiltersAndRender() {
  // BƯỚC 1: LỌC THEO TỪ KHÓA TÌM KIẾM (Search Filter)
  let result = productsData.filter(product => {
    if (!state.searchKeyword) return true;
    const nameMatch = product.name.toLowerCase().includes(state.searchKeyword);
    const descMatch = product.description.toLowerCase().includes(state.searchKeyword);
    const catMatch = product.categoryName.toLowerCase().includes(state.searchKeyword);
    return nameMatch || descMatch || catMatch;
  });

  // BƯỚC 2: LỌC THEO DANH MỤC (Category Filter)
  if (state.selectedCategory !== 'all') {
    result = result.filter(product => product.category === state.selectedCategory);
  }

  // BƯỚC 3: LỌC THEO KHOẢNG GIÁ (Price Bracket Filter)
  if (state.priceBracket !== 'all') {
    if (state.priceBracket === 'under5m') {
      result = result.filter(p => p.price < 5000000);
    } else if (state.priceBracket === '5m-15m') {
      result = result.filter(p => p.price >= 5000000 && p.price <= 15000000);
    } else if (state.priceBracket === '15m-30m') {
      result = result.filter(p => p.price > 15000000 && p.price <= 30000000);
    } else if (state.priceBracket === 'over30m') {
      result = result.filter(p => p.price > 30000000);
    }
  }

  // BƯỚC 4: LỌC CHỈ LẤY SẢN PHẨM GIẢM GIÁ (On Sale Only)
  if (state.onlySale) {
    result = result.filter(p => p.discountPercent > 0);
  }

  // BƯỚC 5: SẮP XẾP VỚI sort() (Comparator Functions)
  result = [...result].sort((a, b) => {
    switch (state.sortBy) {
      case 'price-asc':
        return a.price - b.price; // Giá thấp đến cao
      case 'price-desc':
        return b.price - a.price; // Giá cao đến thấp
      case 'name-asc':
        return a.name.localeCompare(b.name, 'vi'); // Tên A-Z
      case 'rating-desc':
        return b.rating - a.rating; // Đánh giá sao cao nhất
      case 'bestseller':
        return b.reviewsCount - a.reviewsCount; // Đánh giá nhiều nhất
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  // Cập nhật số lượng khớp
  if (DOM.matchCount) {
    DOM.matchCount.textContent = result.length;
  }

  // BƯỚC 6: RENDER RA GIAO DIỆN VỚI map()
  renderCatalogGrid(result);
}

// HIGHLIGHT SEARCH TERMS IN TEXT
function highlightText(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<mark style="background: #fef08a; color: #854d0e; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

// RENDER CATALOG GRID USING map().join('')
function renderCatalogGrid(items) {
  if (!DOM.catalogGrid) return;

  if (items.length === 0) {
    DOM.catalogGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--white); border-radius: var(--radius-xl); border: 2px dashed var(--slate-300);">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--slate-100); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 2.5rem; color: var(--slate-400);">
          <i class="fas fa-search"></i>
        </div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--dark); margin-bottom: 0.5rem;">Không tìm thấy sản phẩm nào!</h3>
        <p style="color: var(--slate-500); max-width: 480px; margin: 0 auto 1.5rem auto;">
          Không có kết quả nào khớp với từ khóa "<strong>${state.searchKeyword}</strong>" hoặc bộ lọc hiện tại. Hãy thử tìm từ khóa khác hoặc đặt lại bộ lọc.
        </p>
        <button class="btn btn-primary" onclick="resetAllFilters()">
          <i class="fas fa-redo"></i> Đặt lại tất cả bộ lọc
        </button>
      </div>
    `;
    return;
  }

  // Dùng map() chuyển đổi mảng Objects thành danh sách HTML Cards
  const cardsHtml = items.map(product => {
    const highlightedTitle = highlightText(product.name, state.searchKeyword);
    const stockBadge = product.inStock 
      ? '<span class="badge badge-success" style="font-size: 0.7rem;"><i class="fas fa-check"></i> Còn hàng</span>'
      : '<span class="badge badge-danger" style="font-size: 0.7rem;"><i class="fas fa-times"></i> Hết hàng</span>';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&auto=format&fit=crop&q=60'">
          ${product.discountPercent > 0 ? `<span class="product-badge-sale"><i class="fas fa-bolt"></i> -${product.discountPercent}%</span>` : ''}
          <span class="product-category-tag">${product.badge || product.categoryName}</span>
        </div>

        <div class="product-info">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em;">${product.categoryName}</span>
            ${stockBadge}
          </div>

          <h4 class="product-title" title="${product.name}">${highlightedTitle}</h4>

          <div class="product-rating">
            <i class="fas fa-star"></i>
            <strong>${product.rating.toFixed(1)}</strong>
            <span class="rating-count">(${product.reviewsCount} đánh giá)</span>
          </div>

          <!-- Specs chips preview -->
          <div class="product-specs">
            <span class="spec-chip"><i class="fas fa-microchip"></i> ${product.specs.chip.split(' ')[0]}</span>
            <span class="spec-chip"><i class="fas fa-memory"></i> ${product.specs.ram}</span>
          </div>

          <!-- Price Block -->
          <div class="product-price-box">
            <span class="price-current">${formatVND(product.price)}</span>
            ${product.originalPrice > product.price ? `<span class="price-original">${formatVND(product.originalPrice)}</span>` : ''}
          </div>

          <!-- Action Buttons -->
          <div style="display: grid; grid-template-columns: 1fr auto; gap: 0.5rem; margin-top: auto;">
            <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
              <i class="fas fa-cart-plus"></i> ${product.inStock ? 'Thêm giỏ hàng' : 'Hết hàng'}
            </button>
            <button class="btn btn-outline btn-sm" title="Xem chi tiết thông số" onclick="openQuickViewModal(${product.id})">
              <i class="fas fa-expand-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  DOM.catalogGrid.innerHTML = cardsHtml;
}

// QUICK VIEW MODAL
window.openQuickViewModal = function(id) {
  const product = productsData.find(p => p.id === id);
  if (!product || !DOM.modalBackdrop || !DOM.modalBody) return;

  DOM.modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; background: var(--slate-100); height: 320px;">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        ${product.discountPercent > 0 ? `<span class="product-badge-sale" style="top: 15px; left: 15px;">-${product.discountPercent}% OFF</span>` : ''}
      </div>

      <div>
        <span class="badge badge-primary" style="margin-bottom: 0.5rem;">${product.categoryName}</span>
        <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--dark); margin-bottom: 0.5rem;">${product.name}</h3>

        <div class="product-rating" style="margin-bottom: 1rem;">
          <i class="fas fa-star"></i>
          <strong>${product.rating.toFixed(1)}</strong>
          <span class="rating-count">(${product.reviewsCount} khách hàng tin dùng)</span>
        </div>

        <div class="product-price-box" style="margin-bottom: 1rem;">
          <span class="price-current" style="font-size: 1.5rem;">${formatVND(product.price)}</span>
          ${product.originalPrice > product.price ? `<span class="price-original">${formatVND(product.originalPrice)}</span>` : ''}
        </div>

        <p style="font-size: 0.9rem; color: var(--slate-600); margin-bottom: 1.25rem; line-height: 1.6;">
          ${product.description}
        </p>

        <!-- Full Specs Table -->
        <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <h5 style="font-weight: 700; color: var(--dark); margin-bottom: 0.5rem;"><i class="fas fa-sliders-h"></i> Thông số kỹ thuật chi tiết:</h5>
          <div style="display: grid; grid-template-columns: 120px 1fr; gap: 0.4rem;">
            <span style="color: var(--slate-500);">Vi xử lý (CPU):</span><strong>${product.specs.chip}</strong>
            <span style="color: var(--slate-500);">Bộ nhớ RAM:</span><strong>${product.specs.ram}</strong>
            <span style="color: var(--slate-500);">Ổ cứng / ROM:</span><strong>${product.specs.storage}</strong>
            <span style="color: var(--slate-500);">Dung lượng Pin:</span><strong>${product.specs.battery}</strong>
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%;" onclick="addToCart(${product.id}); closeQuickViewModal();" ${!product.inStock ? 'disabled' : ''}>
          <i class="fas fa-cart-plus"></i> ${product.inStock ? 'Thêm vào giỏ hàng ngay' : 'Sản phẩm tạm hết hàng'}
        </button>
      </div>
    </div>
  `;

  DOM.modalBackdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeQuickViewModal = function() {
  if (DOM.modalBackdrop) {
    DOM.modalBackdrop.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// SHOPPING CART DRAWER LOGIC
window.addToCart = function(id) {
  const product = productsData.find(p => p.id === id);
  if (!product) return;

  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
};

window.changeCartQty = function(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
  }
  updateCartUI();
};

window.removeCartItem = function(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
};

function updateCartUI() {
  // Tính tổng số lượng món với reduce()
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (DOM.cartBadge) {
    DOM.cartBadge.textContent = totalCount;
    DOM.cartBadge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
  }

  // Tính tổng tiền với reduce()
  const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (DOM.cartTotalAmount) {
    DOM.cartTotalAmount.textContent = formatVND(totalAmount);
  }

  // Render danh sách trong Drawer
  if (DOM.cartItemsContainer) {
    if (state.cart.length === 0) {
      DOM.cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--slate-400);">
          <i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <p>Giỏ hàng chưa có sản phẩm nào</p>
        </div>
      `;
    } else {
      DOM.cartItemsContainer.innerHTML = state.cart.map(item => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--slate-100); gap: 0.75rem;">
          <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--slate-200);">
          <div style="flex: 1; min-width: 0;">
            <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h5>
            <span style="font-size: 0.8rem; color: var(--danger); font-family: var(--font-mono); font-weight: 700;">${formatVND(item.price)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <button class="btn btn-outline btn-sm" style="width: 24px; height: 24px; padding: 0;" onclick="changeCartQty(${item.id}, -1)">-</button>
            <span style="font-size: 0.85rem; font-weight: 700; min-width: 18px; text-align: center;">${item.quantity}</span>
            <button class="btn btn-outline btn-sm" style="width: 24px; height: 24px; padding: 0;" onclick="changeCartQty(${item.id}, 1)">+</button>
            <button class="btn btn-sm btn-outline" style="color: var(--danger); border: none; padding: 0.2rem 0.4rem; margin-left: 0.2rem;" onclick="removeCartItem(${item.id})">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

function openCartDrawer() {
  if (DOM.cartDrawer) DOM.cartDrawer.classList.add('open');
  if (DOM.cartDrawerBackdrop) DOM.cartDrawerBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  if (DOM.cartDrawer) DOM.cartDrawer.classList.remove('open');
  if (DOM.cartDrawerBackdrop) DOM.cartDrawerBackdrop.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// RESET ALL FILTERS
window.resetAllFilters = function() {
  state.searchKeyword = '';
  state.selectedCategory = 'all';
  state.priceBracket = 'all';
  state.onlySale = false;
  state.sortBy = 'featured';

  if (DOM.searchInput) DOM.searchInput.value = '';
  if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = 'none';
  if (DOM.priceBracketSelect) DOM.priceBracketSelect.value = 'all';
  if (DOM.saleToggle) DOM.saleToggle.checked = false;
  if (DOM.sortSelect) DOM.sortSelect.value = 'featured';

  DOM.categoryPills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-category') === 'all');
  });

  applyFiltersAndRender();
  showToast('Đã đặt lại toàn bộ bộ lọc về mặc định!', 'info');
};

// CALCULATE TOTAL WAREHOUSE ASSET VALUE USING reduce()
function updateTotalStockValue() {
  if (!DOM.stockValue) return;
  const totalValue = productsData.reduce((total, p) => total + p.price, 0);
  DOM.stockValue.textContent = formatVND(totalValue);
}
