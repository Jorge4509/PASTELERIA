document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista-solicitudes');
    if(!lista) return;

    lista.addEventListener('click', (e) => {
        const card = e.target.closest('.pedido-card');
        if (!card) return;

        const badge = card.querySelector('.badge-status');
        const actionsDiv = card.querySelector('.card-actions');

        if (e.target.classList.contains('btn-aprobar')) {
            badge.textContent = "Aprobado - En Horno";
            badge.className = "badge-status aprobado";
            actionsDiv.innerHTML = "<p class='procesado-msg'>✓ Anticipo verificado. El pastel se envió a producción.</p>";
        }
        if (e.target.classList.contains('btn-cancelar')) {
            badge.textContent = "Rechazado";
            badge.className = "badge-status rechazado";
            actionsDiv.innerHTML = "<p class='procesado-msg' style='color:#a64444;'>✕ Solicitud descartada.</p>";
        }
    });
});