/* import { buscadorHeader } from "../modulos/buscadorHeader.js" */
import { Carrito } from "./modulos/cart.js";
import { mostrarFooter } from "./modulos/footer.js";
import { mostrarHeader } from "./modulos/header.js";
import { headLinks } from "./modulos/headLinks.js";

document.addEventListener("DOMContentLoaded", () => {
headLinks();
mostrarHeader();
mostrarFooter();


const carrito = new Carrito("abrirCarrito");

carrito.inicializar();

});