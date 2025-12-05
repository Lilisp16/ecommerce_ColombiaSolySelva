/* import { buscadorHeader } from "../modulos/buscadorHeader.js" */
import { Carrito } from "./modulos/cart.js";
import { mostrarHeader } from "./modulos/header.js";
import { headLinks } from "./modulos/headLinks.js"

headLinks();
mostrarHeader();
const carrito = new Carrito("abrirCarrito");

carrito.inicializar();