// Base de datos simulada de tus pasteles (Con los ingredientes que se enviarán a Edamam)
const pastelesLocales = [
    {
        id: 1,
        nombre: "Pastel Vegano de Chocolate",
        descripcion: "Esponjoso pastel sin productos de origen animal.",
        ingredientes: ["200g flour", "50g cocoa powder", "100g maple syrup", "200ml almond milk"]
    },
    {
        id: 2,
        nombre: "Cheesecake de Fresa Tradicional",
        descripcion: "Clásico pastel de queso con base de galleta.",
        ingredientes: ["300g cream cheese", "100g white sugar", "3 eggs", "150g wheat crackers"]
    }
];

const gridPasteles = document.getElementById('grid-pasteles');

// Función para pintar los pasteles en pantalla
function renderizarPasteles() {
    gridPasteles.innerHTML = "";
    
    pastelesLocales.forEach(pastel => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('cake-card');
        
        // Render inicial. Las etiquetas se pueden precalculados o activar al vuelo.
        tarjeta.innerHTML = `
            <div>
                <h3>${pastel.nombre}</h3>
                <p>${pastel.descripcion}</p>
                <div class="badges-container" id="badges-${pastel.id}">
                    <!-- Aquí se inyectarán las etiquetas analizadas -->
                    <span class="badge low-sugar">Analizando...</span>
                </div>
            </div>
            <button class="btn-analizar" onclick="ejecutarAnalisis(${pastel.id})">Ver Info Nutricional</button>
        `;
        gridPasteles.appendChild(tarjeta);
        
        // Opcional: Puedes disparar un análisis automático ligero aquí si lo deseas
        simularEtiquetasEstaticas(pastel.id, pastel.nombre); 
    });
}

// Lógica para procesar las etiquetas automáticas en base a reglas del negocio
function simularEtiquetasEstaticas(id, nombre) {
    const contenedor = document.getElementById(`badges-${id}`);
    contenedor.innerHTML = ""; // Limpiar
    
    // Reglas rápidas basadas en el nombre antes de llamar la API
    if(nombre.toLowerCase().includes('vegano')) {
        contenedor.innerHTML += `<span class="badge vegan">Vegano</span>`;
    }
    if(nombre.toLowerCase().includes('zanahoria') || nombre.toLowerCase().includes('maple')) {
        contenedor.innerHTML += `<span class="badge low-sugar">Bajo en Azúcar</span>`;
    }
}

// Acción del botón: Llama a la API (de api-edamam.js) y abre el Modal
async function ejecutarAnalisis(id) {
    const pastel = pastelesLocales.find(p => p.id === id);
    if (!pastel) return;

    // --- AQUÍ CONECTAS LA API ---
    // Descomenta la línea de abajo cuando pongas tus llaves en api-edamam.js:
    // const infoNutricional = await analizarIngredientesEdamam(pastel.nombre, pastel.ingredientes);
    
    // Datos de prueba (Simulación de lo que responde Edamam si la API tarda o está en desarrollo)
    const infoNutricional = {
        calories: 320,
        totalNutrients: {
            CHOCDF: { quantity: 45 }, // Carbohidratos
            SUGAR: { quantity: 8 }    // Azúcar
        },
        cautions: ["Sulfites", "Gluten"] // Alérgenos comunes que extrae Edamam
    };

    // Poblar datos en el Modal
    document.getElementById('modal-titulo').innerText = pastel.nombre;
    document.getElementById('modal-calorias').innerText = infoNutricional.calories;
    document.getElementById('modal-carbos').innerText = Math.round(infoNutricional.totalNutrients.CHOCDF.quantity);
    document.getElementById('modal-azucar').innerText = Math.round(infoNutricional.totalNutrients.SUGAR.quantity);
    
    const listaAlergenos = document.getElementById('modal-alergenos');
    listaAlergenos.innerHTML = "";
    infoNutricional.cautions.forEach(caution => {
        listaAlergenos.innerHTML += `<li class="badge allergen">${caution}</li>`;
    });

    // Mostrar Modal
    document.getElementById('modal-nutricional').style.display = "flex";
}

// Lógica de cierre del Modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('modal-nutricional').style.display = "none";
});

// Inicializar la vista al cargar la página
window.onload = renderizarPasteles;