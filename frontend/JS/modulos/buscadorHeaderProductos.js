import { crearTarjetaHeaderBuscado } from "./crearTarjeta.js";

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
            contenedorResultados.innerHTML = productosFiltrados.map(crearTarjetaHeaderBuscado).join('');


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