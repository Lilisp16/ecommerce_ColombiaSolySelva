import { formatearMiles, getPathImgs } from "../../JS/main.js";

export const crearTarjeta = (producto) => {
    const numeroRandom = Math.floor(Math.random() * 10) + 1;
    const rutaImagen = getPathImgs(producto.imagen);

    return `
        <div class="cardProducto card mb-5">
            <div class="row g-0">
                <div class="cardProductoImg col-md-5">
                    <img src="${rutaImagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                </div>
                <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text"><small class="text-body-secondary">Último comprado hace  ${numeroRandom} min.</small></p>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${producto.categoria} </p>
                    <p class="card-text d-flex flex-row justify-content-between">
                        <span class="price h4">$ ${formatearMiles(Number(producto.precio))}</span>
                        <span class="">Quedan ${producto.stock} unds</span>
                    </p>
                    <button type="button" class="btn btn-lg btn-primary" data-id="${producto.id}">
                        Agregar
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                        </svg>
                    </button>
                </div>
                </div>
            </div>
        </div>
    `;
}

export const crearTarjetaCatalogo = (producto) => {
    const numeroRandom = Math.floor(Math.random() * 10) + 1;
    const rutaImagen = getPathImgs(producto.imagen);

    return `
        <div class="cardProducto card mb-5 col">
            <div class="row g-0">
                <div class="cardProductoImg col-md-5">
                    <img src="${rutaImagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                </div>
                <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text"><small class="text-body-secondary">Último comprado hace  ${numeroRandom} min.</small></p>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${producto.categoria} </p>
                    <p class="card-text d-flex flex-row justify-content-between">
                        <span class="price h4">$ ${formatearMiles(Number(producto.precio))}</span>
                        <span class="">Quedan ${producto.stock} unds</span>
                    </p>
                    <button type="button" class="btn btn-lg btn-primary  btnAgregarCarrito" data-id="${producto.id}">
                        Agregar
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                        </svg>
                    </button>
                </div>
                </div>
            </div>
        </div>
    `;
}

