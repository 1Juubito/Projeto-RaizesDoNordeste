document.addEventListener('DOMContentLoaded', () => {
    const units = [
        { id: 'centro', name: 'Fortaleza - Meireles', address: 'Av. Beira Mar, 2100', hours: 'Seg-Sáb: 11h às 22h', image: 'img/fortaleza.jpg' },
        { id: 'aldeota', name: 'Recife - Boa Viagem', address: 'Av. Conselheiro Aguiar, 456', hours: 'Seg-Dom: 11h às 23h', image: 'img/recife.jpg' },
        { id: 'meireles', name: 'Salvador - Rio Vermelho', address: 'Rua da Paciência, 789', hours: 'Ter-Dom: 12h às 22h', image: 'img/salvador.jpg' }
    ];

    const container = document.getElementById('units-list'); 
    if (container) {
        container.innerHTML = units.map(unit => `
            <div class="product-card">
                <img src="${unit.image}" alt="${unit.name}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">🏪 ${unit.name}</h3>
                    <p class="card-info">📍 ${unit.address}</p>
                    <p class="card-hours">🕒 ${unit.hours}</p>
                    <button class="btn btn-action btn-select" data-id="${unit.id}">Selecionar unidade →</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.btn-select').forEach(btn => {
            btn.addEventListener('click', () => {
                localStorage.setItem('raizes_selectedUnit', btn.dataset.id); 
                window.location.href = 'cardapio.html';
            });
        });
    }
});