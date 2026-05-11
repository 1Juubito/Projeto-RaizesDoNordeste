document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    if(orderId) {
        const display = document.getElementById('order-id-display');
        if(display) display.textContent = orderId;
    }

    const states = ['recebido', 'preparo', 'pronto', 'entregue'];
    let currentState = 0;

    function updateTracker() {
        states.forEach((state, index) => {
            const stepElement = document.getElementById(`step-${state}`);
            if(!stepElement) return;

            stepElement.className = 'step'; 
            if (index < currentState) {
                stepElement.classList.add('completed');
            } else if (index === currentState) {
                stepElement.classList.add('active');
            }
        });
        
        if(currentState < states.length - 1) {
            currentState++;
            setTimeout(updateTracker, 5000); 
        }
    }
    updateTracker();
});