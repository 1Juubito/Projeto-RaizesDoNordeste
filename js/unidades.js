document.addEventListener('DOMContentLoaded', () => {
    const unitsList = document.getElementById('units-list');

    const unidades = [
        {
            id: 1,
            nome: 'Unidade Salvador - Pelourinho',
            endereco: 'Largo do Cruzeiro de São Francisco, 7 - Centro Histórico',
            horario: '11:00 às 23:00',
            distancia: '1.2 km',
            aberto: true
        },
        {
            id: 2,
            nome: 'Unidade Recife - Boa Viagem',
            endereco: 'Av. Boa Viagem, 2120 - Boa Viagem',
            horario: '10:00 às 22:00',
            distancia: '4.5 km',
            aberto: true 
        },
        {
            id: 3,
            nome: 'Unidade Fortaleza - Meireles',
            endereco: 'Av. Beira Mar, 3220 - Meireles',
            horario: '18:00 às 00:00',
            distancia: '9.0 km',
            aberto: false
        }
    ];

    if (unitsList) {
        unitsList.innerHTML = unidades.map(unidade => `
            <div class="unit-card">
                <div class="unit-header">
                    <h3 class="unit-title">${unidade.nome}</h3>
                    <span class="unit-status ${unidade.aberto ? '' : 'closed'}">
                        ${unidade.aberto ? '🟢 Aberto' : '🔴 Fechado'}
                    </span>
                </div>
                
                <div class="unit-info">
                    <p>📍 ${unidade.endereco}</p>
                    <p>🕒 ${unidade.horario}</p>
                    <p>🛵 A aprox. ${unidade.distancia}</p>
                </div>
                
                <div class="unit-action">
                    <button class="btn btn-full" 
                        ${unidade.aberto ? `onclick="selecionarUnidade(${unidade.id})"` : 'disabled style="background: #ccc; cursor: not-allowed;"'}>
                        ${unidade.aberto ? 'Pedir nesta Unidade' : 'Fechado no momento'}
                    </button>
                </div>
            </div>
        `).join('');
    }
});

window.selecionarUnidade = function(id) {
    localStorage.setItem('raizes_unidade_atual', id);
    
    showToast('Unidade selecionada com sucesso! 🛒', 'success');
    
    setTimeout(() => {
        window.location.href = 'cardapio.html';
    }, 1000);
};