import { crearTarjetaCatalogo } from "./crearTarjeta.js";
import { crearFiltroCategoria } from "./filtroCategorias.js";
import { agregarAlCarrito } from "./agregarCarrito.js";

const API_URL = "http://localhost:8080/producto";

// ⚠️ SOLO EL CONTENEDOR QUE SÍ EXISTE
const contenedorCatalogo = document.getElementById("contenedorCatalogo");
const filtradorProductos = document.getElementById("filtradorProductos");

async function obtenerProductosBackend() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener productos");

        let productos = await response.json();

        productos = productos.map(p => ({
            id: p.idProducto,
            nombre: p.nombreProducto,
            descripcion: p.descripcionProducto,
            categoria: p.categoriaProducto,
            precio: Number(p.precioProducto), // BigDecimal ✔
            stock: p.stockProducto,
            imagen: p.imagenProducto
        }));

        localStorage.setItem("productos", JSON.stringify(productos));

        renderizarCatalogo(productos);
        crearFiltroCategoria(productos, renderizarCatalogo);

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", obtenerProductosBackend);

// ---------------- RENDER ----------------
function renderizarCatalogo(productos) {
    if (!contenedorCatalogo) return;

    contenedorCatalogo.innerHTML = productos
        .map(crearTarjetaCatalogo)
        .join("");
}

// ---------------- BUSCADOR ----------------
if (filtradorProductos) {
    filtradorProductos.addEventListener("input", (e) => {
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const texto = e.target.value.toLowerCase();

        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );

        renderizarCatalogo(filtrados);
    });
}

// ---------------- CARRITO ----------------
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregarCarrito")) {
        const id = Number(e.target.dataset.id);
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const producto = productos.find(p => p.id === id);

        if (producto) agregarAlCarrito(producto);
    }
});