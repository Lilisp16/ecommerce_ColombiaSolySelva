import { crearTarjetaCatalogo } from "./crearTarjeta.js";
const URL_JSON = "../../JS/modulos/json.json";

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
    renderizarPagina(productos);

} else {
    console.log("Cargando productos desde API/JSON...");
    
    fetch(URL_JSON)
        .then(res => res.json())
        .then(productos => {
            localStorage.setItem("productos", JSON.stringify(productos));
            console.log("Exito");
            
            renderizarPagina(productos);
        })
        .catch(err => console.error("Error al cargar JSON:", err));
}