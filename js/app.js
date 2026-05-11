document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById('btn-logout');
    
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('raizes_currentUser');
            showToast('Até logo! Saindo do sistema...', 'warning');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
});

window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '✅';
    if(type === 'warning') icon = '⚠️';
    if(type === 'error') icon = '❌';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};