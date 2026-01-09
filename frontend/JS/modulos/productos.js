import { crearTarjetaCatalogo } from "./crearTarjeta.js";
import { crearFiltroCategoria } from "./filtroCategorias.js";
import { agregarAlCarrito } from "./agregarCarrito.js";

const URL_JSON = "../../JS/modulos/json.json";

function obtenerCategoriaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("categoria");
}

function renderizarCatalogo(productos) {
    recomendadosBox.innerHTML = productos
        .map(crearTarjetaCatalogo)
        .join("");

    nuevosBox.innerHTML = "";
    ultimosBox.innerHTML = "";
}

function renderizarConFiltro(productos) {
    const categoriaURL = obtenerCategoriaURL();

    let productosFinales = productos;

    // filtro por URL (footer)
    if (categoriaURL) {
        productosFinales = productos.filter(
            p => p.categoria === categoriaURL
        );
    }

    renderizarCatalogo(productosFinales);
}

// Contenedores del catálogo
const recomendadosBox = document.getElementById("recomendados");
const nuevosBox = document.getElementById("nuevos");
const ultimosBox = document.getElementById("ultimos");


function renderizarPagina(productos) {
    console.log(productos.length);
    
    // Tarjetas → Recomendados
    recomendadosBox.innerHTML = productos.slice(-4)
        .map(crearTarjetaCatalogo).join("");

    // Tarjetas → Nuevos
    nuevosBox.innerHTML = productos.slice(-8, -4)
        .map(crearTarjetaCatalogo).join("");

    // Tarjetas → Últimas unidades
    ultimosBox.innerHTML = productos.slice(-12, -8)
        .map(crearTarjetaCatalogo).join("");
}

const productosGuardados = localStorage.getItem("productos");

if (productosGuardados) {
    console.log("Cargando productos desde LocalStorage...");
    console.log(productosGuardados);
    
    const productos = JSON.parse(productosGuardados);
    renderizarConFiltro(productos);
    crearFiltroCategoria(productos, renderizarConFiltro);
} else {
    console.log("Cargando productos desde API/JSON...");
    
    fetch(URL_JSON)
        .then(res => res.json())
        .then(productos => {
            localStorage.setItem("productos", JSON.stringify(productos));
            console.log("Exito");
            
            renderizarConFiltro(productos);
        })
        .catch(err => console.error("Error al cargar JSON:", err));
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregarCarrito")) {

        const id = Number(e.target.dataset.id);

        let productosLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
        productosLocalStorage = productosLocalStorage.map(p => ({
        ...p,
        id: Number(p.id),
        precio: Number(p.precio),
        stock: Number(p.stock)
        }));
        console.log("PRODUCTOS NORMALIZADOS:", productosLocalStorage);

        const producto = productosLocalStorage.find(p => p.id === id);

        if (producto) {
            agregarAlCarrito(producto);
        } else {
            console.error("Producto no encontrado en localStorage:", id);
        }
    }
});