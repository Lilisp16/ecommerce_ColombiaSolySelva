/* import { buscadorHeader } from "../modulos/buscadorHeader.js" */
import { Carrito } from "./modulos/cart.js";
import { mostrarFooter } from "./modulos/footer.js";
import { mostrarHeader } from "./modulos/header.js";
import { headLinks } from "./modulos/headLinks.js";

document.addEventListener("DOMContentLoaded", () => {
headLinks();
mostrarHeader();
<<<<<<< HEAD
mostrarFooter();


const carrito = new Carrito("abrirCarrito");

carrito.inicializar();

});
=======

const carrito = new Carrito("abrirCarrito");
carrito.inicializar();
>>>>>>> 2204b37573b16526215fdf65e5ce6ae0432df048
