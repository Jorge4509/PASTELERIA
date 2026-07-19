document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-login');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('password').value.trim();

        if (email === 'admin@pasteleria.com' && pass === 'admin123') {
            localStorage.setItem('userRole', 'admin');
            alert('👑 Acceso correcto como Administrador de The Boarthat');
            window.location.href = 'admin-dashboard.html';
        } else {
            localStorage.setItem('userRole', 'cliente');
            alert('🧁 ¡Bienvenido a The Boarthat! Entrando al catálogo gourmet...');
            window.location.href = '../índice.html';
        }
    });
});