function renderCart() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const container = document.getElementById('cart-items-container');

    if (!container) return;

    const promoAlert = document.getElementById('promo-alert');
    const linhaDesconto = document.getElementById('linha-desconto');
    const freteEl = document.getElementById('frete');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>Seu carrinho está vazio.</p>
                <a href="cardapio.html" class="btn btn-inline">Bora pedir algo?</a>
            </div>
        `;
        document.getElementById('subtotal').textContent = 'R$ 0,00';
        freteEl.textContent = 'R$ 0,00';
        document.getElementById('total').textContent = 'R$ 0,00';
        
        if (linhaDesconto) linhaDesconto.classList.add('hidden');
        if (promoAlert) promoAlert.classList.add('hidden');
        
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

    let taxaEntrega = 5.00;
    let desconto = 0;
    const metaPromocao = 70.00;

    if (subtotal >= metaPromocao) {
        taxaEntrega = 0;
        desconto = subtotal * 0.10;
        
        promoAlert.textContent = '🎉 Parabéns! Você ganhou Frete Grátis e 10% de desconto!';
        promoAlert.className = 'promo-alert';
        
        linhaDesconto.classList.remove('hidden');
        document.getElementById('desconto').textContent = `- R$ ${desconto.toFixed(2)}`;
        
        freteEl.textContent = 'Grátis';
        freteEl.classList.add('frete-gratis-text');
    } else {
        const falta = metaPromocao - subtotal;
        
        promoAlert.textContent = `Faltam R$ ${falta.toFixed(2)} para ganhar Frete Grátis e 10% OFF!`;
        promoAlert.className = 'promo-alert warning';
        
        linhaDesconto.classList.add('hidden');
        
        freteEl.textContent = `R$ ${taxaEntrega.toFixed(2)}`;
        freteEl.classList.remove('frete-gratis-text');
    }

    const totalFinal = subtotal - desconto + taxaEntrega;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `R$ ${totalFinal.toFixed(2)}`;
    
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
                showToast('O seu carrinho está vazio! Escolha uma delícia no cardápio primeiro.', 'warning');
                return;
            }

            const user = JSON.parse(localStorage.getItem('raizes_currentUser'));

            if (!user) {
                showToast('Opa! Você precisa estar logado para finalizar o pedido e ganhar pontos! 🌵', 'warning');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2500); 
                return;
            }

            window.location.href = 'pagamento.html';
        });
    }
});