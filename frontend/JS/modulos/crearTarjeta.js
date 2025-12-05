export const crearTarjeta = (producto) => {
    return `
        <div class="col-md-3">
            <div class="producto-card shadow-sm">
                <img src="${producto.imagen}" class="w-100" alt="${producto.nombre}">
                <div class="p-3">
                    <h5 class="fw-semibold">${producto.nombre}</h5>
                    <p class="text-muted small">${producto.descripcion}</p>
                    <p class="text-secondary small"><strong>Categoría:</strong> ${producto.categoria}</p>
                    <p class="fw-bold">$${producto.precio.toLocaleString()}</p>
                    <button class="btn green-btn w-100">Agregar</button>
                </div>
            </div>
        </div>
    `;
}