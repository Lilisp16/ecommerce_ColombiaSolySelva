import { crearTarjetaCatalogo } from "./crearTarjeta.js";
import { crearFiltroCategoria } from "./filtroCategorias.js";
import { agregarAlCarrito } from "./agregarCarrito.js";


// Contenedores del catálogo
const URL_JSON = "../../JS/modulos/json.json";
const recomendadosBox = document.getElementById("recomendados");
const nuevosBox = document.getElementById("nuevos");
const ultimosBox = document.getElementById("ultimos");
const filtradorProductos = document.getElementById("filtradorProductos");
const productosGuardados = localStorage.getItem("productos");


if (productosGuardados) {
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

function filtrarPorPalabras(listaProductos, textoBusqueda) {
    // 1. Limpiamos el texto: minúsculas y quitamos espacios extra
    const busqueda = textoBusqueda.toLowerCase().trim();
    
    // Si no hay nada escrito, devolvemos todo
    if (busqueda === "") return listaProductos;

    // 2. Dividimos la búsqueda en palabras individuales
    const palabrasBuscadas = busqueda.split(" ");

    return listaProductos.filter(producto => {
        const nombreProducto = producto.nombre.toLowerCase();

        // 3. Verificamos si AL MENOS UNA de las palabras buscadas está en el nombre
        // Si quieres que coincidan TODAS, cambia .some por .every
        return palabrasBuscadas.some(palabra => nombreProducto.includes(palabra));
    });
}

filtradorProductos.addEventListener("input", (e) => {
    const p = localStorage.getItem("productos");
    const productos = JSON.parse(p);
    
    const textoBusqueda = e.target.value;
    const productosFiltrados = filtrarPorPalabras(productos, textoBusqueda);
    renderizarConFiltro(productosFiltrados);
    crearFiltroCategoria(productosFiltrados, renderizarConFiltro);
    
});

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