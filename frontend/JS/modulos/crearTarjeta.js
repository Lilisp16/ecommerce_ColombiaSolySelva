export const crearTarjeta = (producto) => {
    return `
        <div class="card shadow-sm mx-auto" style="max-width: 350px">
            <img src="${producto.imagen}" class="w-100" style="height: 150px; max-height: 150px;" alt="${producto.nombre}">
            <div class="p-3">
                <h5 class="fw-semibold">${producto.nombre}</h5>
                <p class="text-muted small">${producto.descripcion}</p>
                <p class="text-secondary small"><strong>Categoría:</strong> ${producto.categoria}</p>
                <p class="text-secondary small"><strong>Stock:</strong> ${producto.stock}</p>
                <p class="fw-bold">$${producto.precio.toLocaleString()}</p>
                <button class="btn btn-primary w-100">Agregar</button>
            </div>
        </div>
    `;
}

export const crearTarjetaCatalogo = (producto) => {
    return `
    <div class="col-md-3 my-4">
        <div class="card shadow-sm" style="min-height: 435px;">
            <img src="${producto.imagen}" class="w-100" style="height: 150px; max-height: 150px;" alt="${producto.nombre}">
            <div class="p-3">
                <h5 class="fw-semibold">${producto.nombre}</h5>
                <p class="text-muted small">${producto.descripcion}</p>
                <p class="text-secondary small"><strong>Categoría:</strong> ${producto.categoria}</p>
                <p class="text-secondary small"><strong>Stock:</strong> ${producto.stock}</p>
                <p class="fw-bold">$${producto.precio.toLocaleString()}</p>
                <button class="btn btn-primary w-100">Agregar</button>
            </div>
        </div>
    </div>
    `;
}
//<div class="col-md-3 my-4">