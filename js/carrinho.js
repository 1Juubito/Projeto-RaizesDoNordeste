function renderCart() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const currentUser = JSON.parse(localStorage.getItem('raizes_currentUser')); 
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
        
        atualizarBadgeGlobal();
        return;
    }

    let subtotal = 0;

    let htmlItens = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        let imgSrc = 'img/baiao.jpg';
        if (item.name.includes('Carne')) imgSrc = 'img/carne.jpg';
        if (item.name.includes('Moqueca')) imgSrc = 'img/moqueca.jpg';
        if (item.name.includes('Pastel')) imgSrc = 'img/pastel.jpg';
        if (item.name.includes('Suco')) imgSrc = 'img/suco.jpg';
        if (item.name.includes('Refrigerante')) imgSrc = 'img/refri.jpg';
        if (item.name.includes('Pudim')) imgSrc = 'img/pudim.jpg';
        if (item.name.includes('Cartola')) imgSrc = 'img/cartola.jpg';

        return `
            <div class="cart-item-modern">
                <div class="cart-item-img-box">
                    <img src="${imgSrc}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <strong class="item-title">${item.name}</strong>
                    <span class="item-unit-price">R$ ${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-controls">
                    <div class="qty-modern">
                        <button onclick="updateQty(${index}, -1)" class="btn-qty">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button onclick="updateQty(${index}, 1)" class="btn-qty">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    R$ ${itemTotal.toFixed(2)}
                </div>
                <button class="btn-remove-modern" onclick="removeItem(${index})" title="Remover item">
                    &times;
                </button>
            </div>
        `;
    }).join('');

    const pontos = currentUser ? currentUser.points || 0 : 0;
    let brindesHTML = '';

    if (pontos >= 101) { 
        brindesHTML += `
            <div class="cart-item-modern brinde-item brinde-prata-box">
                <div class="cart-item-img-box">
                    <img src="img/suco.jpg" alt="Suco">
                </div>
                <div class="cart-item-details">
                    <strong class="item-title">🎁 Brinde Prata: Suco de Caju</strong>
                    <span class="item-unit-price">Clube Raízes</span>
                </div>
                <div class="cart-item-controls">
                    <span class="qty-value brinde-prata-text">1</span>
                </div>
                <div class="cart-item-total brinde-prata-text">
                    Grátis
                </div>
            </div>
        `;
    }

    if (pontos > 300) { 
        brindesHTML += `
            <div class="cart-item-modern brinde-item brinde-ouro-box">
                <div class="cart-item-img-box">
                    <img src="img/pudim.jpg" alt="Pudim">
                </div>
                <div class="cart-item-details">
                    <strong class="item-title">🎁 Brinde Ouro: Pudim de Leite</strong>
                    <span class="item-unit-price">Clube Raízes</span>
                </div>
                <div class="cart-item-controls">
                    <span class="qty-value brinde-ouro-text">1</span>
                </div>
                <div class="cart-item-total brinde-ouro-text">
                    Grátis
                </div>
            </div>
        `;
    }

    container.innerHTML = htmlItens + brindesHTML;

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
    
    atualizarBadgeGlobal();
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