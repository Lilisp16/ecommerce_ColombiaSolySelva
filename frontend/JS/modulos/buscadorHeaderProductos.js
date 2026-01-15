import { formatearMiles, getPathImgs } from "../main.js";


export const buscadorHeaderProductos = () => {
    const buscador = document.getElementById("buscarProductosHeader");
    
    // 1. Creamos el contenedor de resultados una sola vez
    const contenedorResultados = document.createElement("div");
    contenedorResultados.id = "contenedor-busqueda-resultados";
    
    // Estilos sugeridos para posicionamiento y dimensiones
    Object.assign(contenedorResultados.style, {
        width: "380px",
        height: "450px",
        marginTop: "35px",
        backgroundColor: "var(--color-fondo)",
        border: "1px solid var(--color-cafe)",
        overflowY: "auto",
        display: "none", // Oculto por defecto
        position: "absolute",
        top: "65px",
        zIndex: "100",
        borderRadius: "1em",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
    });

    // Insertamos el contenedor justo después del input
    buscador.parentNode.insertBefore(contenedorResultados, buscador.nextSibling);

    buscador.addEventListener("input", (e) => {
        const p = localStorage.getItem("productos");
        const productos = JSON.parse(p) || [];
        
        const textoBusqueda = e.target.value.toLowerCase();
        
        // Limpiamos resultados previos
        contenedorResultados.innerHTML = "";

        if (textoBusqueda === "") {
            contenedorResultados.style.display = "none";
            return;
        }

        const productosFiltrados = filtrarPorPalabras(productos, textoBusqueda);
        
        if (productosFiltrados.length > 0) {
            contenedorResultados.style.display = "block";
            
            // Usamos map para crear un array de strings HTML y join para unirlos
            contenedorResultados.innerHTML = productosFiltrados.map(producto => `
                <div class="card-body  p-3 text-dark">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <div class="rounded-4" style="width: 80px; height: 80px; display: flex">
                                <img src="${getPathImgs(producto.imagen)}" style="border: none; display:block; max-width: 100%; max-height:100%; object-fit-contain; border-radius: 16px">
                            </div>
                        </div>

                        <div class="flex-grow-1" style="min-width: 0;">
                            <h6 class="card-title" style="display: block; overflow: hidden; text-overflow: ellipsis;">
                                <strong>${producto.nombre}</strong>
                            </h6>
                            <h6>Vr. Unit. $${formatearMiles(Number(producto.precio))} </h6>
                         </div>

                        <button type="button" class="btn btn-lg btn-primary  btnAgregarCarrito" data-id="${producto.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                            </svg>
                        </button>

                        </div>
                    </div>
            `).join('');

        } else {
            contenedorResultados.innerHTML = "<p class='text-center p-3'>No hay resultados</p>";
        }
    });
}

function filtrarPorPalabras(listaProductos, textoBusqueda) {
    const busqueda = textoBusqueda.toLowerCase().trim();
    
    if (busqueda === "") return listaProductos;

    const palabrasBuscadas = busqueda.split(" ");

    return listaProductos.filter(producto => {
        const nombreProducto = producto.nombre.toLowerCase();
        return palabrasBuscadas.some(palabra => nombreProducto.includes(palabra));
    });
}