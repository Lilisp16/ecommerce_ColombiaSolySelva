import { formatearMiles } from "../../JS/main.js";
export function cartItemCarrito (producto) {
    const nuevoProducto = `
    <div class="d-flex justify-content-center">
                <div class="cartItem card rounded-4 mb-3" style="max-width: 500px;">
                    <div class="card-body  rounded-4 border border-dark p-3 text-dark">
                        <div class="d-flex align-items-center">
                        <div class="me-2 d-flex flex-column gap-4">
                            <label class="checkbox-wrapper">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                            <i class="btn-eliminarItem bi bi-trash3" style="cursor: pointer" data-id="${producto.id}"></i>
                        </div>
                        <div class="me-3">
                            <div class="border border-black bg-dark rounded-4" style="width: 80px; height: 80px;">
                                <img src="${producto.imagen}" class="img-fluid h-100 object-fit-cover">
                            </div>
                        </div>

                        <div class="flex-grow-1" style="min-width: 0;">
                            <h6 class="card-title" 
                                style="display: block; max-width: 150px; overflow: hidden; text-overflow: ellipsis;">
                                <strong>${producto.nombre}</strong>
                            </h6>
                            <h6>Vr. Unit. $ ${formatearMiles(producto.precio)} </h6>
                            <h6>Subtotal: $ ${formatearMiles(Number(producto.precio) * Number(producto.cantidad))}</h6>
                        </div>

                        <div class="d-flex flex-column align-items-end justify-content-between" style="height: 80px;">
                            <i class="bi bi-heart-fill"></i>
                            <div class="d-flex align-items-center gap-2">
                            <button class="text-black btn btn-outline-dark btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center btn-decrementar" data-id="${producto.id}" style="width: 25px; height: 25px;">-</button>
                            <span class="fw-bold">${producto.cantidad}</span>
                            <button class="text-black btn btn-outline-dark btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center btn-incrementar" data-id="${producto.id}" style="width: 25px; height: 25px;">+</button>
                            </div>  
                        </div>

                        </div>
                    </div>
                </div>
              </div>
    `
    return nuevoProducto;
} 

export const productosRecientes = (producto) => {
    const nuevoProducto = `
    <div class="container">
                <div class="cartItem card rounded-4 mb-3" style="max-width: 500px;">
                    <div class="card-body  rounded-4 border border-clear p-3 text-dark">
                        <div class="d-flex align-items-center">
                        <div class="me-2 d-flex flex-column gap-4">
                            <i class="bi bi-trash3"></i>
                        </div>
                        <div class="me-4">
                            <div class="border border-black bg-dark rounded-4" style="width: 80px; height: 80px;">
                                <img src="${producto.imagen}" class="img-fluid h-100 object-fit-cover rounded-4">
                            </div>
                        </div>

                        <div class="flex-grow-1">
                            <h6 class="card-title mb-0 fw-bold text-truncate text-nowrap d-block" style="max-width: 150px;">
                                ${producto.nombre}
                            </h6>
                            <h6 class="text-secondary fw-bold">Valor Unitario: $ ${formatearMiles(producto.precio)} </h6>
                            <h6 class="text-secondary fw-bold">En stock: ${producto.stock} unds</h6>
                            
                        </div>
                        <div class="d-flex flex-column align-items-end justify-content-between" style="height: 80px;">
                            <i class="bi bi-heart-fill"></i>
                        </div>

                        </div>
                    </div>
                </div>
              </div>
    `
    return nuevoProducto;
} 

export function cartItemCarritoVersion1 (producto) {
    const nuevoProducto = `
    <div class="d-flex justify-content-center">
                <div class="cartItem card rounded-4 mb-3" style="max-width: 500px;">
                    <div class="card-body  rounded-4 border border-dark p-3 text-dark">
                        <div class="d-flex align-items-center">
                        <div class="me-2 d-flex flex-column gap-4">
                            <label class="checkbox-wrapper">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                            <i class="bi bi-trash3"></i>
                        </div>
                        <div class="me-3">
                            <div class="border border-black bg-dark rounded-4" style="width: 80px; height: 80px;">
                                <img src="${producto.imagen}" class="img-fluid h-100 object-fit-cover">
                            </div>
                        </div>

                        <div class="flex-grow-1">
                            <h5 class="card-title mb-0 fw-normal text-truncate text-nowrap d-block" style="max-width: 150px;">
                                ${producto.nombre}asdfasdfasdfasdfasdfasdf
                            </h5>
                            <p class="card-text mb-0">
                            <small class="text-secondary fw-bold">En stock</small>
                            <small class="fw-bold">${producto.stock} unds</small>
                            </p>
                            <h6>Vr. Unit. $ ${producto.precio} </h6>
                        </div>

                        <div class="d-flex flex-column align-items-end justify-content-between" style="height: 80px;">
                            <i class="bi bi-heart-fill"></i>
                            <div class="d-flex align-items-center gap-2">
                            <button class="text-black btn btn-outline-dark btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center btn-decrementar" data-id="${producto.id}" style="width: 25px; height: 25px;">-</button>
                            <span class="fw-bold">${producto.cantidad}</span>
                            <button class="text-black btn btn-outline-dark btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center btn-incrementar" data-id="${producto.id}" style="width: 25px; height: 25px;">+</button>
                            </div>  
                        </div>

                        </div>
                    </div>
                </div>
              </div>
    `
    return nuevoProducto;
} 