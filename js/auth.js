document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-pass').value;

            const users = JSON.parse(localStorage.getItem('raizes_users')) || [];
            const user = users.find(u => u.email === email && u.password === pass);

            if (user) {
                localStorage.setItem('raizes_currentUser', JSON.stringify(user));
                showToast(`Bem-vindo de volta, ${user.name}! 🌵`, 'success');
                
                setTimeout(() => { 
                    window.location.href = 'unidades.html'; 
                }, 2000);
            } else {
                showToast('E-mail ou senha incorretos. Tente novamente!', 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-pass').value;
            const channel = document.getElementById('reg-channel').value;
            const lgpd = document.getElementById('reg-lgpd').checked;

            if (!lgpd) {
                showToast('Você precisa aceitar os termos da LGPD.', 'warning');
                return;
            }

            const users = JSON.parse(localStorage.getItem('raizes_users')) || [];
            
            if (users.find(u => u.email === email)) {
                showToast('Este e-mail já está cadastrado!', 'error');
                return;
            }

            const newUser = { name, email, password: pass, channel, points: 0 };
            users.push(newUser);
            localStorage.setItem('raizes_users', JSON.stringify(users));
            
            localStorage.setItem('raizes_currentUser', JSON.stringify(newUser));

            showToast('Cadastro realizado com sucesso! 🎉', 'success');
            
            setTimeout(() => { 
                window.location.href = 'unidades.html'; 
            }, 2000);
        });
    }

    const btnEsqueci = document.getElementById('btn-esqueci');
    
    if (btnEsqueci) {
        btnEsqueci.addEventListener('click', (e) => {
            e.preventDefault();
            
            const emailField = document.getElementById('login-email').value;
            
            if (!emailField) {
                showToast('Por favor, digite seu e-mail no campo acima para recuperar a senha.', 'warning');
                document.getElementById('login-email').focus();
            } else {
                showToast('Verificando servidor...', 'warning');
                
                setTimeout(() => {
                    showToast(`Um link de recuperação foi enviado para ${emailField}! 📧`, 'success');
                    document.getElementById('login-pass').focus();
                }, 1200);
            }
        });
    }
});