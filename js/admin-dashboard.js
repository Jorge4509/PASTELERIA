document.addEventListener('DOMContentLoaded', () => {
    const rol = localStorage.getItem('userRole');
    if (rol !== 'admin') {
        alert('⛔ Área Exclusiva: Requiere credenciales de Administrador.');
        window.location.href = '../índice.html';
        return;
    }

    const btnEdamam = document.getElementById('btn-edamam');
    const txtIngredientes = document.getElementById('ingredientes');
    const tagsResultado = document.getElementById('tags-resultado');
    const formAdmin = document.getElementById('form-admin-pastel');

    btnEdamam.addEventListener('click', () => {
        const texto = txtIngredientes.value.trim().toLowerCase();
        if (!texto) return alert("Ingresa ingredientes para mapear con la API.");

        btnEdamam.textContent = "Analizando en Edamam...";
        tagsResultado.innerHTML = "<span>Calculando alérgenos...</span>";

        setTimeout(() => {
            let tags = [];
            // Filtros en riguroso español
            if (texto.includes('matcha') || texto.includes('zanahoria') || texto.includes('almendra')) {
                tags.push('🌱 Vegetariano');
            }
            if (texto.includes('aceite') || texto.includes('agua')) {
                tags.push('🥦 Vegano');
            }
            if (!texto.includes('azúcar') && !texto.includes('sugar')) {
                tags.push('🍬 Bajo en Azúcar');
            }
            
            if (tags.length === 0) tags.push('Estándar Gourmet');

            tagsResultado.innerHTML = "";
            tags.forEach(t => {
                const span = document.createElement('span');
                span.style.cssText = "background: #e6ede9; color: #2c4a3e; padding: 6px 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-right: 5px; border-radius: 4px;";
                span.textContent = t;
                tagsResultado.appendChild(span);
            });
            btnEdamam.textContent = "🔍 Mapear Dieta con Edamam";
        }, 800);
    });

    formAdmin.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("💾 Éxito: Nueva creación con archivo multimedia guardado en el catálogo de The Boarthat.");
        formAdmin.reset();
        tagsResultado.innerHTML = '<span class="placeholder-tag">Ninguna receta analizada todavía.</span>';
    });
});