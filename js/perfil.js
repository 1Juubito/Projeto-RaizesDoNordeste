document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('raizes_currentUser'));

    if (!user) {
        showToast('Opa! Você precisa estar logado para ver o perfil.', 'warning');
        setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        return;
    }

    document.getElementById('perfil-nome').value = user.name || '';
    document.getElementById('perfil-email').value = user.email || '';
    document.getElementById('perfil-cpf').value = user.cpf || '';
    document.getElementById('perfil-nascimento').value = user.nascimento || '';
    document.getElementById('perfil-telefone').value = user.telefone || '';

    const formPerfil = document.getElementById('form-perfil');
    
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();

            user.name = document.getElementById('perfil-nome').value;
            user.cpf = document.getElementById('perfil-cpf').value;
            user.nascimento = document.getElementById('perfil-nascimento').value;
            user.telefone = document.getElementById('perfil-telefone').value;

            localStorage.setItem('raizes_currentUser', JSON.stringify(user));

            let users = JSON.parse(localStorage.getItem('raizes_users')) || [];
            const userIndex = users.findIndex(u => u.email === user.email);
            
            if (userIndex > -1) {
                users[userIndex] = user;
                localStorage.setItem('raizes_users', JSON.stringify(users));
            }

            showToast('Perfil atualizado com sucesso! 🌵', 'success');
        });
    }
});