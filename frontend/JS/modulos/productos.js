import { crearTarjetaCatalogo } from "./crearTarjeta.js";
import { crearFiltroCategoria } from "./filtroCategorias.js";
import { agregarAlCarrito } from "./agregarCarrito.js";

// ---------------- CONFIG ----------------
const API_URL = "http://localhost:8080/producto"; // Ajusta según tu backend

// ---------------- ELEMENTOS ----------------
const recomendadosBox = document.getElementById("recomendados");
const nuevosBox = document.getElementById("nuevos");
const ultimosBox = document.getElementById("ultimos");
const filtradorProductos = document.getElementById("filtradorProductos");

// ---------------- CARGAR PRODUCTOS ----------------
async function obtenerProductosBackend() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener productos del backend");

        let productos = await response.json();

        // Mapear los campos del backend a los que usa el front
        productos = productos.map(p => ({
            id: p.idProducto,
            nombre: p.nombreProducto,
            descripcion: p.descripcionProducto,
            categoria: p.categoriaProducto,
            precio: Number(p.precioProducto),
            stock: p.stockProducto,
            imagen: p.imagenProducto
        }));

        // Guardar en localStorage por si se necesita
        localStorage.setItem("productos", JSON.stringify(productos));

        renderizarConFiltro(productos);
        crearFiltroCategoria(productos, renderizarConFiltro);

        return productos;
    } catch (error) {
        console.error("Error cargando productos:", error);
        return [];
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    obtenerProductosBackend();
});

// ---------------- FILTRADO POR TEXTO ----------------
function filtrarPorPalabras(listaProductos, textoBusqueda) {
    const busqueda = textoBusqueda.toLowerCase().trim();
    if (busqueda === "") return listaProductos;

    const palabrasBuscadas = busqueda.split(" ");

    return listaProductos.filter(producto => {
        return palabrasBuscadas.some(palabra => producto.nombre.toLowerCase().includes(palabra));
    });
}

filtradorProductos.addEventListener("input", (e) => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const textoBusqueda = e.target.value;
    const productosFiltrados = filtrarPorPalabras(productos, textoBusqueda);
    renderizarConFiltro(productosFiltrados);
    crearFiltroCategoria(productosFiltrados, renderizarConFiltro);
});

// ---------------- FILTRADO POR CATEGORÍA URL ----------------
function obtenerCategoriaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("categoria");
}

// ---------------- RENDERIZADO ----------------
function renderizarCatalogo(productos) {
    recomendadosBox.innerHTML = productos.map(crearTarjetaCatalogo).join("");
    nuevosBox.innerHTML = "";
    ultimosBox.innerHTML = "";
}

function renderizarConFiltro(productos) {
    const categoriaURL = obtenerCategoriaURL();
    let productosFinales = productos;

    if (categoriaURL) {
        productosFinales = productos.filter(p => p.categoria === categoriaURL);
    }

    renderizarCatalogo(productosFinales);
}

// ---------------- CLIC EN AGREGAR AL CARRITO ----------------
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregarCarrito")) {
        const id = Number(e.target.dataset.id);
        const productos = JSON.parse(localStorage.getItem("productos")) || [];

        const producto = productos.find(p => p.id === id);

        if (producto) {
            agregarAlCarrito(producto);
        } else {
            console.error("Producto no encontrado:", id);
        }
    }
});