document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const container = document.getElementById('cart-items-container');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <p class="cart-empty">
                Seu carrinho está vazio. <br>
                <a href="cardapio.html" class="btn btn-inline">Bora pedir algo?</a>
            </p>
        `;
        document.getElementById('subtotal').textContent = 'R$ 0,00';
        document.getElementById('total').textContent = 'R$ 0,00';
        updateBadge();
        return;
    }

    let subtotal = 0;

    container.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong class="cart-item-title">${item.name}</strong>
                    <span class="cart-item-price">R$ ${item.price.toFixed(2)} / un</span>
                </div>
                <div class="qty-controls">
                    <button onclick="updateQty(${index}, -1)">-</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button onclick="updateQty(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    R$ ${itemTotal.toFixed(2)}
                </div>
                <button class="btn-remove" onclick="removeItem(${index})" title="Remover item">🗑️</button>
            </div>
        `;
    }).join('');

    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `R$ ${(subtotal + 5).toFixed(2)}`;
    
    updateBadge();
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
        alert('Adicione itens ao carrinho antes de finalizar!');
        return;
    }
    window.location.href = 'pagamento.html';
}

function updateBadge() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    if(badge) badge.textContent = totalItems;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    const btnCheckout = document.getElementById('btn-checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];

            if (cart.length === 0) {
                alert('O seu carrinho está vazio! Escolha uma delícia no cardápio primeiro.');
                return;
            }

            const user = JSON.parse(localStorage.getItem('raizes_currentUser'));

            if (!user) {
                alert('Olha só, você ainda não se identificou! 🌵\n\nPara finalizar o pedido e acumular pontos no nosso Programa de Fidelidade, você precisa entrar na sua conta ou criar uma rapidinho.');
                window.location.href = 'index.html';
                return;
            }

            window.location.href = 'pagamento.html';
        });
    }
});