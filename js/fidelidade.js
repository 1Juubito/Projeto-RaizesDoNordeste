document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('raizes_currentUser'));

    if (!user) {
        showToast('Você precisa estar logado para ver seus pontos!', 'warning');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }

    const points = user.points || 0;
    
    document.getElementById('user-points').innerHTML = `${points} <span class="points-unit">pts</span>`;

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const userTier = document.getElementById('user-tier');

    let percent = 0;

    if (points <= 100) {
        userTier.textContent = 'Nível Atual: 🥉 Bronze';
        document.getElementById('tier-bronze').classList.add('active');

        percent = (points / 100) * 100;
        const falta = 101 - points;
        progressText.textContent = `Faltam ${falta} pontos para o Nível Prata!`;

    } else if (points <= 300) {
        userTier.textContent = 'Nível Atual: 🥈 Prata';
        document.getElementById('tier-prata').classList.add('active');
        
        percent = ((points - 100) / 200) * 100;
        const falta = 301 - points;
        progressText.textContent = `Faltam ${falta} pontos para o Nível Ouro!`;

    } else {
        userTier.textContent = 'Nível Atual: 🥇 Ouro';
        document.getElementById('tier-ouro').classList.add('active');
        
        percent = 100;
        progressText.textContent = `Você atingiu o nível máximo! Aproveite os benefícios VIPs.`;
        progressBar.classList.add('gold-bar');
    }

    setTimeout(() => {
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }
    }, 300);
});