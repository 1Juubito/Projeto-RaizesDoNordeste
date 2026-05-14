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

            const novoUsuario = { nome, email, senha, points: 0, primeiroAcesso: true };
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
                if (usuarioValido.primeiroAcesso) {
                    showToast(`Bem-vindo, ${usuarioValido.nome}! 🌵`, 'success');
                    
                    usuarioValido.primeiroAcesso = false;
                    
                    const index = usuarios.findIndex(u => u.email === usuarioValido.email);
                    if(index !== -1) {
                        usuarios[index] = usuarioValido;
                        localStorage.setItem('raizes_users', JSON.stringify(usuarios));
                        if(window.mockDB) window.mockDB.users = usuarios;
                    }
                } else {
                    showToast(`Bem-vindo de volta, ${usuarioValido.nome}! 🌵`, 'success');
                }

                localStorage.setItem('raizes_currentUser', JSON.stringify(usuarioValido));
                
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
            const novoCep = document.getElementById('perfil-cep').value;
            const novoLogradouro = document.getElementById('perfil-logradouro').value;
            const novoNumero = document.getElementById('perfil-numero').value;
            const novoBairro = document.getElementById('perfil-bairro').value;
            const novoCidade = document.getElementById('perfil-cidade').value;
            const novoComplemento = document.getElementById('perfil-complemento').value;

            let userLogado = JSON.parse(localStorage.getItem('raizes_currentUser'));

            if (userLogado) {
                userLogado.nome = novoNome;
                userLogado.cpf = novoCpf;
                userLogado.nascimento = novoNascimento;
                userLogado.telefone = novoTelefone;
                userLogado.cep = novoCep;
                userLogado.logradouro = novoLogradouro;
                userLogado.numero = novoNumero;
                userLogado.bairro = novoBairro;
                userLogado.cidade = novoCidade;
                userLogado.complemento = novoComplemento;

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
                    
                    showToast('Dados e endereço atualizados com sucesso! 🌵', 'success');
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
            const inputCep = document.getElementById('perfil-cep');
            const inputLogradouro = document.getElementById('perfil-logradouro');
            const inputNumero = document.getElementById('perfil-numero');
            const inputBairro = document.getElementById('perfil-bairro');
            const inputCidade = document.getElementById('perfil-cidade');
            const inputComplemento = document.getElementById('perfil-complemento');

            if (inputNome) inputNome.value = userLogado.nome || '';
            if (inputEmail) inputEmail.value = userLogado.email || '';
            
            if (inputCpf) {
                inputCpf.value = window.mascaraCPF(userLogado.cpf || '');
                
                if (userLogado.cpf && userLogado.cpf.length >= 11) {
                    inputCpf.disabled = true;
                }
            }
            
            if (inputNascimento) {
                inputNascimento.value = userLogado.nascimento || '';

                if (userLogado.nascimento) {
                    inputNascimento.disabled = true;
                }
            }
            
            if (inputTelefone) {
                inputTelefone.value = window.mascaraTelefone(userLogado.telefone || '');
            }

            if (inputCep) inputCep.value = userLogado.cep || '';
            if (inputLogradouro) inputLogradouro.value = userLogado.logradouro || '';
            if (inputNumero) inputNumero.value = userLogado.numero || '';
            if (inputBairro) inputBairro.value = userLogado.bairro || '';
            if (inputCidade) inputCidade.value = userLogado.cidade || '';
            if (inputComplemento) inputComplemento.value = userLogado.complemento || '';

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

const cepInput = document.getElementById('perfil-cep');
const numeroInput = document.getElementById('perfil-numero');

if (cepInput) {
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); 
        
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2'); 
        }
        
        e.target.value = value;
    });
}

if (numeroInput) {
    numeroInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

function atualizarBadgeGlobal() {
    const cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badgeDesktop = document.getElementById('cart-badge');
    if (badgeDesktop) badgeDesktop.textContent = totalItems;

    const badgesMobile = document.querySelectorAll('.cart-badge-global');
    badgesMobile.forEach(badge => {
        badge.textContent = totalItems;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarBadgeGlobal();
});

const btnLogoutPerfil = document.getElementById('btn-logout-perfil');

if (btnLogoutPerfil) {
    btnLogoutPerfil.addEventListener('click', () => {
        localStorage.removeItem('raizes_currentUser');
        window.location.href = 'index.html';
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const btn = e.target;
        const currentUser = JSON.parse(localStorage.getItem('raizes_currentUser'));

        if (!currentUser) {
            if (typeof mostrarPopupVisitante === 'function') {
                mostrarPopupVisitante();
            } else {
                alert('Faça login para adicionar itens ao carrinho!');
            }
            return;
        }

        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const qtyInput = document.getElementById(`qty-${id}`);
        const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

        let cart = JSON.parse(localStorage.getItem('raizes_cart')) || [];
        const index = cart.findIndex(item => item.id === id);

        if (index !== -1) {
            cart[index].quantity += quantity;
        } else {
            cart.push({ id, name, price, quantity });
        }
        localStorage.setItem('raizes_cart', JSON.stringify(cart));
        if (typeof atualizarBadgeGlobal === 'function') atualizarBadgeGlobal();
        if (typeof showToast === 'function') {
            showToast(`${quantity}x ${name} adicionado! 🛒`, 'success');
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('raizes_currentUser'));
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const paginasProtegidas = ['carrinho.html', 'fidelidade.html', 'perfil.html'];
    const btnVisitante = document.getElementById('btn-visitante');
    if (btnVisitante) {
        btnVisitante.addEventListener('click', () => {
            window.location.href = 'unidades.html';
        });
    }

    if (!currentUser && paginasProtegidas.includes(currentPage)) {
        window.location.href = 'index.html';
        return; 
    }

    if (!currentUser && currentPage !== 'index.html') {
        const linksProtegidos = document.querySelectorAll('a[href="carrinho.html"], a[href="fidelidade.html"], a[href="perfil.html"]');
        linksProtegidos.forEach(link => {
            link.classList.add('guest-disabled'); 
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
            });
        });

        const btnSairDesktop = document.getElementById('btn-logout');
        if (btnSairDesktop) {
            btnSairDesktop.style.display = 'none';
        }

        const btnSairAntigo = document.querySelector('a[href="index.html"][onclick*="removeItem"]');
        if (btnSairAntigo) {
            btnSairAntigo.style.display = 'none';
        }
    }
});

function mostrarPopupVisitante() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-visitante-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal-visitante-box';
    modal.innerHTML = `
        <div class="modal-visitante-icon">🔒</div>
        <h3 class="modal-visitante-title">Quase lá!</h3>
        <p class="modal-visitante-text">
            Para adicionar delícias ao seu carrinho e montar o seu pedido, você precisa criar uma conta rapidinho.
        </p>
        <div class="modal-visitante-actions">
            <button id="btn-fechar-modal" class="btn-modal-secondary">Agora Não</button>
            <button id="btn-login-modal" class="btn-modal-primary">Fazer Login</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('btn-fechar-modal').addEventListener('click', () => {
        overlay.remove();
    });

    document.getElementById('btn-login-modal').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}