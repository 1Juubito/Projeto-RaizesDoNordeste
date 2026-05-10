window.mockDB = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    products: [
        { id: 'm1', name: 'Tapioca de Charque', price: 22.90, description: 'Goma fresca com charque desfiado e queijo coalho derretido.', unitId: 'matriz' },
        { id: 'm2', name: 'Cuscuz Turbinado', price: 18.90, description: 'Cuscuz de milho no vapor com ovo, calabresa e carne de sol.', unitId: 'matriz' },
        { id: 'm3', name: 'Escondidinho de Macaxeira', price: 34.90, description: 'Creme de macaxeira com carne seca, gratinado com queijo.', unitId: 'matriz' },
        { id: 'm4', name: 'Acarajé no Prato', price: 25.90, description: 'Acompanha vatapá, caruru, camarão seco e vinagrete.', unitId: 'matriz' },
        { id: 'm5', name: 'Suco de Cajá', price: 8.90, description: 'Copo 400ml da fruta natural.', unitId: 'matriz' },
        { id: 'm6', name: 'Cajuína Gelada', price: 7.50, description: 'Lata 330ml bem gelada.', unitId: 'matriz' }
    ]
};

window.saveMock = () => {
    localStorage.setItem('users', JSON.stringify(window.mockDB.users));
    localStorage.setItem('orders', JSON.stringify(window.mockDB.orders));
};