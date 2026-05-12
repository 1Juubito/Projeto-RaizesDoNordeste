document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('raizes_currentUser'));

    if (!user) {
        if (typeof showToast === 'function') {
            showToast('Você precisa estar logado para rastrear pedidos.', 'warning');
        } else {
            alert('Você precisa estar logado para rastrear pedidos.');
        }
        setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        return;
    }

    let currentStep = 0;
    const steps = document.querySelectorAll('.stepper-item');
    const titleEl = document.getElementById('status-title');
    const messageEl = document.getElementById('status-message');
    const rewardBox = document.getElementById('reward-message');

    if (steps.length === 0) {
        console.error("Erro: Passos da linha do tempo não encontrados no HTML!");
        return;
    }

    const statusData = [
        { title: "Preparando tudo por aqui!", msg: "Recebemos seu pedido e já vamos colocar a mão na massa." },
        { title: "Cheirinho de tempero!", msg: "Seu prato já está na chapa do nosso chef." },
        { title: "Saiu para entrega!", msg: "O motoboy já pegou o pacote. Fique de olho no portão!" },
        { title: "Pedido Entregue!", msg: "Bom apetite! Esperamos que você adore o tempero." }
    ];

    const trackingInterval = setInterval(() => {
        console.log("Avançando para o passo: ", currentStep + 1);
        
        if (currentStep < steps.length - 1) {
            steps[currentStep].classList.remove('active');
            steps[currentStep].classList.add('completed');
            
            currentStep++;
            
            steps[currentStep].classList.add('active');
            
            if (titleEl && messageEl) {
                titleEl.textContent = statusData[currentStep].title;
                messageEl.textContent = statusData[currentStep].msg;
            }

            if (currentStep === steps.length - 1) {
                console.log("Pedido concluído com sucesso!");
                clearInterval(trackingInterval);
                
                steps[currentStep].classList.remove('active');
                steps[currentStep].classList.add('completed');
                
                if (rewardBox) {
                    rewardBox.classList.remove('hidden');
                }
            }
        }
    }, 6000); 
});