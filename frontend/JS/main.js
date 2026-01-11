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

export function formatearMiles(numero) {
  return numero.toLocaleString('es-CO'); 
}


//rutas para manejo de funciones en el header
export function getPath(pagina) {
  const path = window.location.pathname;

  // Si está en una subcarpeta
  if (path.includes("/pages/")) {
    return pagina;
  }

  // Si está en la raíz
  return `pages/${pagina}`;
}
