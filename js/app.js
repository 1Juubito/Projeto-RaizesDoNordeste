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

            if (window.mockDB) {
                window.mockDB.users = usuarios;
            }

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

    const esqueciSenhaLink = document.getElementById('esqueci-senha-link');
    const modalForgot = document.getElementById('forgot-password-modal');
    const modalInbox = document.getElementById('inbox-modal');
    const formRecover = document.getElementById('recover-form');

    if (esqueciSenhaLink && modalForgot) {
        esqueciSenhaLink.addEventListener('click', (e) => {
            e.preventDefault();
            modalForgot.classList.remove('hidden');
        });

        document.getElementById('close-modal-btn').addEventListener('click', () => modalForgot.classList.add('hidden'));
        document.getElementById('close-inbox-btn').addEventListener('click', () => modalInbox.classList.add('hidden'));
        
        modalForgot.addEventListener('click', (e) => {
            if(e.target === modalForgot) modalForgot.classList.add('hidden');
        });
        modalInbox.addEventListener('click', (e) => {
            if(e.target === modalInbox) modalInbox.classList.add('hidden');
        });

        formRecover.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailDigitado = document.getElementById('recover-email').value.trim();
            let usuarios = JSON.parse(localStorage.getItem('raizes_users')) || [];
            const index = usuarios.findIndex(u => u.email === emailDigitado);

            if (index !== -1) {
                const senhaTemporaria = "raizes123";
                usuarios[index].senha = senhaTemporaria;
                
                localStorage.setItem('raizes_users', JSON.stringify(usuarios));
                if (window.mockDB) window.mockDB.users = usuarios;

                modalForgot.classList.add('hidden');
                formRecover.reset();
                showToast('Link de recuperação enviado!', 'success');
                
                document.getElementById('inbox-user-email').textContent = usuarios[index].email;
                document.getElementById('inbox-user-name').textContent = usuarios[index].nome;
                
                setTimeout(() => {
                    modalInbox.classList.remove('hidden');
                }, 1500);
                
            } else {
                showToast('E-mail não encontrado no nosso sistema.', 'error');
            }
        });
    }

    const inputCpf = document.getElementById('perfil-cpf');
    const inputTelefone = document.getElementById('perfil-telefone');

    if (inputCpf) {
        inputCpf.addEventListener('input', (e) => {
            e.target.value = window.mascaraCPF(e.target.value);
        });
    }

    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            e.target.value = window.mascaraTelefone(e.target.value);
        });
    }

    const formPerfil = document.getElementById('form-perfil');

    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();

            const novoNome = document.getElementById('perfil-nome').value;
            const novoCpf = document.getElementById('perfil-cpf').value;
            const novoNascimento = document.getElementById('perfil-nascimento').value;
            const novoTelefone = document.getElementById('perfil-telefone').value;

            let userLogado = JSON.parse(localStorage.getItem('raizes_currentUser'));

            if (userLogado) {
                userLogado.nome = novoNome;
                userLogado.cpf = novoCpf;
                userLogado.nascimento = novoNascimento;
                userLogado.telefone = novoTelefone;

                localStorage.setItem('raizes_currentUser', JSON.stringify(userLogado));

                const nameDisplay = document.getElementById('user-name-display');
                if (nameDisplay) nameDisplay.textContent = novoNome;

                let usuarios = JSON.parse(localStorage.getItem('raizes_users')) || [];
                const index = usuarios.findIndex(u => u.email === userLogado.email);

                if (index !== -1) {
                    usuarios[index] = userLogado;
                    localStorage.setItem('raizes_users', JSON.stringify(usuarios));

                    if (window.mockDB) {
                    window.mockDB.users = usuarios;
                    }
                    
                    showToast('Dados atualizados com sucesso! 🌵', 'success');
                } else {
                    showToast('Erro ao atualizar banco de dados.', 'error');
                }
            }
        });
    }

    const changePasswordForm = document.getElementById('change-password-form');
    
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const novaSenha = document.getElementById('nova-senha').value;
            const userLogado = JSON.parse(localStorage.getItem('raizes_currentUser'));

            if (userLogado) {
                userLogado.senha = novaSenha;
                localStorage.setItem('raizes_currentUser', JSON.stringify(userLogado));

                let usuarios = JSON.parse(localStorage.getItem('raizes_users')) || [];
                
                const index = usuarios.findIndex(u => u.email === userLogado.email);

                if (index !== -1) {
                    usuarios[index].senha = novaSenha;
                    localStorage.setItem('raizes_users', JSON.stringify(usuarios));

                    if (window.mockDB) {
                    window.mockDB.users = usuarios;
                    }
                    
                    showToast('Senha atualizada com sucesso! 🔐', 'success');
                    changePasswordForm.reset();
                } else {
                    showToast('Erro ao encontrar usuário no banco.', 'error');
                }
            }
        });
    }

    const nameDisplay = document.getElementById('user-name-display');
    const emailDisplay = document.getElementById('user-email-display');
    const pointsDisplay = document.getElementById('user-points-display');

    if (nameDisplay && emailDisplay) {
        const userLogado = JSON.parse(localStorage.getItem('raizes_currentUser'));

        if (userLogado) {
            nameDisplay.textContent = userLogado.nome;
            emailDisplay.textContent = userLogado.email;
            if (pointsDisplay) pointsDisplay.textContent = userLogado.points || 0;

            const inputNome = document.getElementById('perfil-nome');
            const inputEmail = document.getElementById('perfil-email');
            const inputCpf = document.getElementById('perfil-cpf');
            const inputNascimento = document.getElementById('perfil-nascimento');
            const inputTelefone = document.getElementById('perfil-telefone');

            if (inputNome) inputNome.value = userLogado.nome || '';
            if (inputEmail) inputEmail.value = userLogado.email || '';
            
            if (inputCpf) {
                inputCpf.value = window.mascaraCPF(userLogado.cpf || '');
                
                if (userLogado.cpf && userLogado.cpf.length >= 11) {
                    inputCpf.disabled = true;
                    inputCpf.style.color = "#999";
                }
            }
            
            if (inputNascimento) {
                inputNascimento.value = userLogado.nascimento || '';

                if (userLogado.nascimento) {
                    inputNascimento.disabled = true;
                    inputNascimento.style.color = "#999";
                }
            }
            
            if (inputTelefone) {
                inputTelefone.value = window.mascaraTelefone(userLogado.telefone || '');
            }

        } else {
            window.location.href = 'index.html';
        }
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

window.mascaraCPF = function(valor) {
    if (!valor) return '';
    return valor
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .slice(0, 14);
};

window.mascaraTelefone = function(valor) {
    if (!valor) return '';
    let v = valor.replace(/\D/g, "");
    
    if (v.length <= 10) {
        return v.replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2")
                .slice(0, 14);
    } else {
        return v.replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .slice(0, 15);
    }
};