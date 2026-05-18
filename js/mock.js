window.mockDB = {
    users: JSON.parse(localStorage.getItem('raizes_users')) || [],
    orders: JSON.parse(localStorage.getItem('raizes_orders')) || [],
    
    products: [
        { id: 'p1', name: 'Baião de Dois', price: 28.90, description: 'Arroz, feijão verde, queijo coalho e temperos.', image: 'img/baiao.jpg' },
        { id: 'p2', name: 'Carne de Sol', price: 45.90, description: 'Carne de sol acebolada com macaxeira cozida.', image: 'img/carne.jpg' },
        { id: 'p3', name: 'Moqueca de Peixe', price: 52.90, description: 'Peixe fresco, leite de coco, azeite de dendê.', image: 'img/moqueca.jpg' },
        { id: 'p4', name: 'Pastel Crocante', price: 12.90, description: 'Pastel crocante recheado com carne de sol e catupiry.', image: 'img/pastel.jpg' },
        { id: 'p5', name: 'Suco de Caju', price: 7.90, description: 'Suco natural de caju.', image: 'img/suco.jpg' },
        { id: 'p6', name: 'Refrigerante Lata', price: 6.50, description: 'Lata 350ml bem gelada.', image: 'img/refri.jpg' },
        { id: 'p7', name: 'Pudim de Leite', price: 9.90, description: 'Pudim caseiro com calda de caramelo.', image: 'img/pudim.jpg' },
        { id: 'p8', name: 'Cartola', price: 14.90, description: 'Banana Frita, quejo coalho e canela.', image: 'img/cartola.jpg' }
    ]
};

window.saveMock = () => {
    localStorage.setItem('raizes_users', JSON.stringify(window.mockDB.users));
    localStorage.setItem('raizes_orders', JSON.stringify(window.mockDB.orders));
};