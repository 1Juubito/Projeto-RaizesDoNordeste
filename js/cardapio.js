document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-list');
    const products = window.mockDB.products;

    container.innerHTML = products.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p style="font-size: 0.9rem; color: #666; min-height: 40px;">${p.description}</p>
            <div class="price">R$ ${p.price.toFixed(2)}</div>
            <div style="display: flex; gap: 10px;">
                <input type="number" id="qty-${p.id}" value="1" min="1" max="10" style="width: 70px; margin: 0;">
                <button class="btn" onclick="addToCart('${p.id}', '${p.name}', ${p.price})">Adicionar</button>
            </div>
        </div>
    `).join('');

    updateBadge();
});

function addToCart(id, name, price) {
    const qtyInput = document.getElementById(`qty-${id}`);
    const quantity = parseInt(qtyInput.value) || 1;

    let cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }

    localStorage.setItem('raizes_cart', JSON.stringify(cart));
    alert(`${quantity}x ${name} adicionado ao carrinho!`);
    updateBadge();
}

function updateBadge() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    if(badge) badge.textContent = totalItems;
}