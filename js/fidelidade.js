document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('raizes_currentUser'));
    const pointsSpan = document.getElementById('user-points');
    const aviso = document.getElementById('login-aviso');

    if (user && pointsSpan) {
        pointsSpan.innerText = user.points || 0;
        if(aviso) aviso.style.display = 'none';
    }
});