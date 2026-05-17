let totemCart = [];
let tempoInatividade = 60;
let countdownInterval;

function iniciarAtendimento() {
    document.getElementById('welcome-overlay').classList.add('hidden');
    resetTimer();
    document.body.addEventListener('click', resetTimer);
}

function resetTimer() {
    tempoInatividade = 60;
    document.getElementById('timeout-warning').classList.add('hidden');
    clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        tempoInatividade--;
        document.getElementById('totem-timer').textContent = `Tempo: ${tempoInatividade}s`;
        
        if (tempoInatividade === 10) {
            document.getElementById('timeout-warning').classList.remove('hidden');
        }
        
        if (tempoInatividade <= 0) {
            resetTotemTotalmente();
        }
    }, 1000);
}

function continuarAtendimento() {
    resetTimer();
}

function resetTotemTotalmente() {
    clearInterval(countdownInterval);
    totemCart = [];
    const cpfInput = document.getElementById('totem-cpf');
    if(cpfInput) cpfInput.value = '';
    
    renderTotemCart();
    document.getElementById('welcome-overlay').classList.remove('hidden');
    document.getElementById('timeout-warning').classList.add('hidden');
    document.body.removeEventListener('click', resetTimer);
}

function adicionarAoTotem(name, price) {
    const itemExistente = totemCart.find(item => item.name === name);
    if (itemExistente) {
        itemExistente.quantity++;
    } else {
        totemCart.push({ name, price, quantity: 1 });
    }
    renderTotemCart();
}

function updateTotemQty(index, change) {
    totemCart[index].quantity += change;
    if (totemCart[index].quantity <= 0) {
        totemCart.splice(index, 1);
    }
    renderTotemCart();
}

function limparTotem() {
    totemCart = [];
    renderTotemCart();
}

function renderTotemCart() {
    const container = document.getElementById('totem-cart-items');
    const totalVal = document.getElementById('totem-total-value');
    
    if (totemCart.length === 0) {
        container.innerHTML = `<p style="color: #999; text-align: center; margin-top: 50px;">O carrinho está vazio.<br>Toque em um produto para adicionar!</p>`;
        totalVal.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    container.innerHTML = totemCart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="totem-cart-row">
                <div>
                    <strong style="display:block; color:var(--text-dark);">${item.name}</strong>
                    <span style="color:#777; font-size:0.9rem;">R$ ${itemTotal.toFixed(2)}</span>
                </div>
                <div class="totem-qty-box">
                    <button class="btn-totem-qty" onclick="updateTotemQty(${index}, -1)">-</button>
                    <span style="font-weight:bold; width:20px; text-align:center;">${item.quantity}</span>
                    <button class="btn-totem-qty" onclick="updateTotemQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');

    totalVal.textContent = `R$ ${total.toFixed(2)}`;
}

function finalizarPedidoTotem() {
    if (totemCart.length === 0) {
        alert('Selecione ao menos um item antes de pagar!');
        return;
    }

    const cpfInput = document.getElementById('totem-cpf');
    const cpf = cpfInput ? cpfInput.value : '';
    clearInterval(countdownInterval);

    const modalProcessando = document.createElement('div');
    modalProcessando.className = 'totem-timeout-warning';
    modalProcessando.innerHTML = `
        <div class="totem-timeout-box">
            <h2 style="color: var(--primary);">Insira ou Aproxime o Cartão 💳</h2>
            <p style="margin-top:15px; font-size:1.1rem;">Comunicação com o serviço de pagamento externo...</p>
            <div style="margin: 20px auto; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="color:#777; font-size:0.9rem;">Simulando transação segura de Checkout.</p>
        </div>
    `;
    document.body.appendChild(modalProcessando);

    setTimeout(() => {
        modalProcessando.innerHTML = `
            <div class="totem-timeout-box">
                <span style="font-size: 4rem;">✅</span>
                <h2 style="color: #27ae60; margin-top:10px;">PAGO COM SUCESSO!</h2>
                <p style="margin: 15px 0; color:#555;">Retire a sua senha de atendimento e o comprovante abaixo.</p>
                ${cpf ? `<p style="background:#e8f5e9; color:#2e7d32; padding:8px; border-radius:8px; font-weight:bold; font-size:0.9rem;">🎉 Pontos creditados no CPF: ${cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>` : ''}
                <h1 style="font-size:3rem; color:var(--accent); margin:20px 0;">SENHA: ${Math.floor(Math.random() * 900) + 100}</h1>
                <p style="color:#aaa; font-size:0.8rem;">O Totem reiniciará em instantes...</p>
            </div>
        `;
        
        setTimeout(() => {
            modalProcessando.remove();
            resetTotemTotalmente();
        }, 5000);
    }, 3000);
}