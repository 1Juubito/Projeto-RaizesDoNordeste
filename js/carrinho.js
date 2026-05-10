document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const container = document.getElementById('cart-items-container');

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding: 2rem;">Seu carrinho está vazio. <br><br><a href="cardapio.html" class="btn" style="display:inline-block; width:auto;">Bora pedir algo?</a></p>`;
        document.getElementById('subtotal').textContent = 'R$ 0,00';
        document.getElementById('total').textContent = 'R$ 0,00';
        return;
    }

    let subtotal = 0;

    container.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="cart-item">
                <div style="flex: 2; text-align: left;">
                    <strong style="font-size: 1.1rem; color: var(--text-dark);">${item.name}</strong><br>
                    <span style="color: #666; font-size: 0.9rem;">R$ ${item.price.toFixed(2)} / un</span>
                </div>
                <div class="qty-controls" style="flex: 1; text-align: center;">
                    <button onclick="updateQty(${index}, -1)">-</button>
                    <span style="margin: 0 15px; font-weight: bold; font-size: 1.1rem;">${item.quantity}</span>
                    <button onclick="updateQty(${index}, 1)">+</button>
                </div>
                <div style="flex: 1; text-align: right; font-weight: bold; color: var(--accent); font-size: 1.1rem;">
                    R$ ${itemTotal.toFixed(2)}
                </div>
                <button onclick="removeItem(${index})" style="background: none; border: none; cursor: pointer; font-size: 1.5rem; color: var(--primary); margin-left: 15px;" title="Remover item">🗑️</button>
            </div>
        `;
    }).join('');

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `R$ ${(subtotal + 5).toFixed(2)}`;
}

function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('raizes_cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('raizes_cart', JSON.stringify(cart));
    renderCart();
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    if (cart.length === 0) {
        alert('Adiciona itens ao cardápio antes de finalizar!');
        return;
    }
    
    alert('A redirecionar para o gateway de pagamento externo...');
    
    window.location.href = 'pagamento.html';
}