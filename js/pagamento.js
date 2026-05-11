document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    if (!paymentForm) return;

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
        if (cart.length === 0) {
            showToast('O carrinho está vazio!', 'warning');
            setTimeout(() => {
                window.location.href = 'cardapio.html';
            }, 2000);
            return;
        }

        showToast('Processando pagamento de forma segura...', 'warning');

        setTimeout(() => {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5;
            const user = JSON.parse(localStorage.getItem('raizes_currentUser'));
            
            const orderId = 'RDN-' + Math.floor(Math.random() * 100000);
            const newOrder = { id: orderId, items: cart, total: total, status: 'recebido', date: new Date().toISOString() };
            
            let orders = JSON.parse(localStorage.getItem('raizes_orders')) || [];
            orders.push(newOrder);
            localStorage.setItem('raizes_orders', JSON.stringify(orders));

            if (user) {
                const pontosGanhos = Math.floor(total / 10);
                user.points = (user.points || 0) + pontosGanhos;
                
                let users = JSON.parse(localStorage.getItem('raizes_users')) || [];
                const userIndex = users.findIndex(u => u.email === user.email);
                if(userIndex > -1) users[userIndex] = user;
                
                localStorage.setItem('raizes_users', JSON.stringify(users));
                localStorage.setItem('raizes_currentUser', JSON.stringify(user));
                
                showToast(`Pagamento aprovado! Você ganhou ${pontosGanhos} pontos de fidelidade. 🚀`, 'success');
            }

            localStorage.removeItem('raizes_cart');
            
            setTimeout(() => {
                window.location.href = `pedido.html?id=${orderId}`;
            }, 2500);

        }, 1500);
    });
});