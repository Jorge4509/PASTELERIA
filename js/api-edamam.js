// Apartado de configuración de Credenciales Edamam
const EDAMAM_APP_ID = "TU_APP_ID_AQUÍ"; 
const EDAMAM_APP_KEY = "TU_APP_KEY_AQUÍ";

/**
 * Envía un array de ingredientes a la API de Edamam para obtener el análisis completo.
 * @param {string} titulo - Nombre del pastel
 * @param {Array<string>} ingredientes - Lista de ingredientes (ej: ["100g sugar", "3 eggs"])
 */
async function analizarIngredientesEdamam(titulo, ingredientes) {
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
    
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titulo,
                ingr: ingredientes
            })
        });

        if (!respuesta.ok) {
            throw new Error("Error en la solicitud a Edamam");
        }

        const data = await respuesta.json();
        return data; // Retorna todo el JSON con nutrientes y alérgenos
    } catch (error) {
        console.error("Error al conectar con la API de Edamam:", error);
        return null;
    }
}