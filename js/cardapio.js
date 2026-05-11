document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-list'); 

    if (!container) return;

    const products = [
        { id: 'p1', name: 'Baião de Dois', price: 28.90, description: 'Arroz, feijão verde, queijo coalho e temperos.', image: 'img/baiao.jpg' },
        { id: 'p2', name: 'Carne de Sol', price: 45.90, description: 'Carne de sol acebolada com macaxeira cozida.', image: 'img/carne.jpg' },
        { id: 'p3', name: 'Moqueca de Peixe', price: 52.90, description: 'Peixe fresco, leite de coco, azeite de dendê.', image: 'img/moqueca.jpg' },
        { id: 'p4', name: 'Pastel Crocante', price: 12.90, description: 'Pastel crocante recheado com carne de sol e catupiry.', image: 'img/pastel.jpg' },
        { id: 'p5', name: 'Suco de Caju', price: 7.90, description: 'Suco natural de caju.', image: 'img/suco.jpg' },
        { id: 'p6', name: 'Refrigerante Lata', price: 6.50, description: 'Lata 350ml bem gelada.', image: 'img/refri.jpg' },
        { id: 'p7', name: 'Pudim de Leite', price: 9.90, description: 'Pudim caseiro com calda de caramelo.', image: 'img/pudim.jpg' },
        { id: 'p8', name: 'Cartola', price: 14.90, description: 'Manga, queijo coalho e canela.', image: 'img/cartola.jpg' }
    ];

    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${p.name}</h3>
                <p class="card-desc">${p.description}</p>
                <div class="card-price">R$ ${p.price.toFixed(2)}</div>
                <div class="card-actions">
                    <input type="number" id="qty-${p.id}" value="1" min="1" max="10" class="qty-input">
                    <button class="btn btn-action" onclick="addToCart('${p.id}', '${p.name}', ${p.price})">Adicionar</button>
                </div>
            </div>
        </div>
    `).join('');

    updateBadge();
});

window.addToCart = function(id, name, price) {
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
    showToast(`${quantity}x ${name} adicionado ao carrinho!`, 'success');
    updateBadge();
}

function updateBadge() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    if(badge) badge.textContent = totalItems;
}