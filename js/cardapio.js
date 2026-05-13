document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-list'); 
    if (!container) return;

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-cart')) {
            const btn = e.target;
            
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            
            const qtyInput = document.getElementById(`qty-${id}`);
            const quantity = parseInt(qtyInput.value) || 1;

            addToCart(id, name, price, quantity);
        }
    });

    const filtersContainer = document.getElementById('filters-container');
    const allCards = document.querySelectorAll('.product-card');

    if (filtersContainer) {
        filtersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-filter')) {
                
                document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const filterValue = e.target.dataset.filter;

                allCards.forEach(card => {
                    const cardCategory = card.dataset.categoria;
                    
                    if (filterValue === 'todos' || filterValue === cardCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
        });
    }

    atualizarBadgeGlobal();
});

function addToCart(id, name, price, quantity) {
    let cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }

    localStorage.setItem('raizes_cart', JSON.stringify(cart));
    
    if (typeof showToast === 'function') {
        showToast(`${quantity}x ${name} adicionado ao carrinho!`, 'success');
    } else {
        alert(`${quantity}x ${name} adicionado ao carrinho!`);
    }
    
    atualizarBadgeGlobal();
}