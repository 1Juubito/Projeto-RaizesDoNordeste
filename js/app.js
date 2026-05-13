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

    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('reg-nome').value;
            const email = document.getElementById('reg-email').value;
            const senha = document.getElementById('reg-senha').value;
            const confirmar = document.getElementById('reg-confirmar-senha').value;

            if (senha !== confirmar) {
                showToast('As senhas não coincidem! 🌵', 'warning');
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem('raizes_users')) || [];
            
            const usuarioExiste = usuarios.find(u => u.email === email);
            if (usuarioExiste) {
                showToast('Este e-mail já está cadastrado!', 'error');
                return;
            }

            const novoUsuario = { nome, email, senha, points: 0 };
            usuarios.push(novoUsuario);
            localStorage.setItem('raizes_users', JSON.stringify(usuarios));

            showToast('Cadastro realizado! Redirecionando...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email').value;
            const senhaInput = document.getElementById('senha').value;

            let usuarios = JSON.parse(localStorage.getItem('raizes_users')) || [];

            const usuarioValido = usuarios.find(u => u.email === emailInput && u.senha === senhaInput);

            if (usuarioValido) {
                localStorage.setItem('raizes_currentUser', JSON.stringify(usuarioValido));
                
                showToast(`Bem-vindo de volta, ${usuarioValido.nome}! 🌵`, 'success');
                
                setTimeout(() => {
                    window.location.href = 'unidades.html'; 
                }, 1500);
            } else {
                showToast('Ops! E-mail ou senha incorretos.', 'error');
            }
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