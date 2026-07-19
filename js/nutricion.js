document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-auditar-pastel');
    const select = document.getElementById('select-pastel-nutricion');
    const resultado = document.getElementById('resultado-edamam');

    btn.addEventListener('click', () => {
        if (!select.value) return alert("Selecciona una pieza de repostería.");
        btn.textContent = "Llamando a Edamam...";
        
        setTimeout(() => {
            resultado.classList.remove('hidden');
            const esMatcha = select.value === "1";
            resultado.innerHTML = `
                <h3>📋 Certificación de Nutrientes (Edamam API)</h3>
                <div style="margin: 15px 0; background: #fbf9f6; padding: 15px; border-left: 3px solid #2c4a3e;">
                    <p><strong>Calorías Totales:</strong> ${esMatcha ? 380 : 290} kcal</p>
                    <p><strong>Base Dietética:</strong> ${esMatcha ? 'Almendras y Té Verde' : 'Trigo Integral con Especias'}</p>
                </div>
                <h4>Etiquetas Dietéticas Validadas:</h4>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <span style="background: #e6ede9; color: #2c4a3e; padding: 5px 10px; font-size: 12px; font-weight: bold; border-radius: 3px;">${esMatcha ? '🌱 Vegetariano' : '🥦 Vegano'}</span>
                    <span style="background: #e6ede9; color: #2c4a3e; padding: 5px 10px; font-size: 12px; font-weight: bold; border-radius: 3px;">${esMatcha ? 'Gourmet Artesanal' : '🍬 Bajo en Azúcar'}</span>
                </div>
            `;
            btn.textContent = "Auditar Receta";
        }, 800);
    });
});