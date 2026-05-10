document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newUser = {
                id: Date.now(),
                name: document.getElementById('reg-name').value,
                email: document.getElementById('reg-email').value,
                pass: document.getElementById('reg-pass').value,
                channel: document.getElementById('reg-channel').value,
                points: 0
            };

            let users = JSON.parse(localStorage.getItem('raizes_users')) || [];
            
            if (users.find(u => u.email === newUser.email)) {
                alert('Este e-mail já está cadastrado!');
                return;
            }

            users.push(newUser);
            localStorage.setItem('raizes_users', JSON.stringify(users));
            localStorage.setItem('raizes_currentUser', JSON.stringify(newUser));

            alert(`Bem-vindo à Raízes do Nordeste, ${newUser.name}! Redirecionando...`);
            window.location.href = 'unidades.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-pass').value;

            const users = JSON.parse(localStorage.getItem('raizes_users')) || [];
            const user = users.find(u => u.email === email && u.pass === pass);

            if (user) {
                localStorage.setItem('raizes_currentUser', JSON.stringify(user));
                window.location.href = 'unidades.html';
            } else {
                alert('E-mail ou senha incorretos. Tente novamente!');
            }
        });
    }
});