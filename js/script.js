document.addEventListener('DOMContentLoaded', () => {
    let pastelSeleccionado = null;
    const cards = document.querySelectorAll('.pastel-card');
    const contenedorResumen = document.getElementById('contenedor-resumen');
    const formApartado = document.getElementById('form-apartado');
    const txtTotal = document.getElementById('resumen-total');
    const txtAnticipo = document.getElementById('resumen-anticipo');

    cards.forEach(card => {
        const btn = card.querySelector('.btn-seleccionar');
        btn.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('seleccionada'));
            
            pastelSeleccionado = {
                id: card.dataset.id,
                nombre: card.dataset.nombre,
                precio: parseFloat(card.dataset.precio)
            };

            card.classList.add('seleccionada');
            actualizarInterfaz();
        });
    });

    function actualizarInterfaz() {
        if (pastelSeleccionado) {
            contenedorResumen.innerHTML = `<p class="item-resumen"><strong>Producto:</strong> ${pastelSeleccionado.nombre}</p>`;
            formApartado.classList.remove('hidden');
            
            const total = pastelSeleccionado.precio;
            const anticipo = total * 0.5;

            txtTotal.textContent = `$${total.toFixed(2)} MXN`;
            txtAnticipo.textContent = `$${anticipo.toFixed(2)} MXN`;
        }
    }

    formApartado.addEventListener('submit', (e) => {
        e.preventDefault();
        const fecha = document.getElementById('fecha-entrega').value;
        alert(`🎉 ¡Pedido Recibido! Tu apartado para el día ${fecha} quedó registrado en The Boarthat.`);
        formApartado.reset();
        formApartado.classList.add('hidden');
        contenedorResumen.innerHTML = `<p>No has seleccionado ningún pastel artesanal todavía.</p>`;
        cards.forEach(c => c.classList.remove('seleccionada'));
    });
});