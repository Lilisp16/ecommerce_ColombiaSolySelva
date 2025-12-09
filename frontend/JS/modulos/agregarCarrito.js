import { nuevoProducto } from "./cartItem.js";
import { crearTarjeta } from "./crearTarjeta.js";


const URL_JSON = "../../JS/modulos/json.json";

// Arrays de datos
let productosJSON = [];
let productosLocalStorage = JSON.parse(localStorage.getItem("catalogoLS")) || [];
let catalogoGeneral = [];


// 1️⃣ Cargar productos del JSON
fetch(URL_JSON)
    .then(res => res.json())
    .then(data => {
        productosJSON = data;
        unirProductos();
        console.log("CATÁLOGO UNIFICADO", catalogoGeneral);
    });


// 2️⃣ Unir JSON + LocalStorage en un solo array (sin validaciones)
function unirProductos() {
    catalogoGeneral = [...productosJSON, ...productosLocalStorage];
    console.log("Catalogo general"+catalogoGeneral        7)
}


// 3️⃣ Buscar producto por ID
function buscarProducto(id) {
    return catalogoGeneral.find(p => p.id == id);
}


// 4️⃣ Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = buscarProducto(id);

    if (!producto) {
        console.error("Producto no encontrado:", id);
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("Producto cargado");

    const existe = carrito.find(p => p.id == id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Producto agregado al carrito:", producto.nombre);
}



// 5️⃣ Delegación de eventos
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregarCarrito")) {
        const idProducto = e.target.dataset.id;
        agregarAlCarrito(idProducto);
    }
});
