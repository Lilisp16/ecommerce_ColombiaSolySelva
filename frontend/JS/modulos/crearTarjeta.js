export const crearTarjeta = (producto) => {
    return `
        <div class="card shadow-sm mx-auto" style="max-width: 350px">
            <img src="${producto.imagen}" class="w-100 object-fit-cover" style="height: 200px; max-height: 200px;" alt="${producto.nombre}">
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
        <div class="card text-center d-flex align-items-center" style="height: 435px;">
            <h5 class="fw-semibold">${producto.nombre}</h5>
            <img src="${producto.imagen}" class="w-75" style="height: 150px;" alt="${producto.nombre}">
            <p class="text-muted small">${producto.descripcion}</p>
            <p class="text-secondary small"><strong>Categoría:</strong> ${producto.categoria}</p>
            <p class="text-secondary small"><strong>Stock:</strong> ${producto.stock} unds</p>
            <p class="fw-bold">$${producto.precio.toLocaleString()}</p>
            <button class="btn btn-primary w-75 btnAgregarCarrito" data-id="${producto.id}">Agregar</button>
        </div>
    </div>
    `;
}



//<div class="col-md-3 my-4">