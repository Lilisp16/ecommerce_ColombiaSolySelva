/* import { buscadorHeader } from "../modulos/buscadorHeader.js" */
import { Carrito } from "./modulos/cart.js";
import { mostrarFooter } from "./modulos/footer.js";
import { mostrarHeader } from "./modulos/header.js";
import { headLinks } from "./modulos/headLinks.js";
import { buscadorHeaderProductos } from "./modulos/buscadorHeaderProductos.js";
import { mostrarLogin } from "./modulos/loginHeaderIndex.js";
import { initRegistroUsuario } from "./modulos/registroUsuarioDB.js";



document.addEventListener("DOMContentLoaded", () => {

  // Inicializar registro SOLO si existe el formulario
  if (document.getElementById("registroForm")) {
    initRegistroUsuario();
  }

  headLinks();
  mostrarHeader();
  mostrarFooter();
  buscadorHeaderProductos();
  mostrarLogin();


  // Inicializar el menú hamburguesa cuando Bootstrap esté disponible
  const initNavbarCollapse = () => {
    const navCollapse = document.getElementById('mainNav');
    if (navCollapse && window.bootstrap) {
      new bootstrap.Collapse(navCollapse, { toggle: false });
    }
  };

  // Esperar a que Bootstrap esté cargado (se carga dinámicamente via headLinks.js)
  if (window.bootstrap) {
    initNavbarCollapse();
  } else {
    // Verificar periódicamente hasta que Bootstrap esté disponible
    const checkBootstrap = setInterval(() => {
      if (window.bootstrap) {
        clearInterval(checkBootstrap);
        initNavbarCollapse();
      }
    }, 50);
    // Timeout de seguridad después de 5 segundos
    setTimeout(() => clearInterval(checkBootstrap), 5000);
  }

  const carrito = new Carrito("abrirCarrito");
  carrito.inicializar();
})

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

export function getPathImgs(rutaImg) {
  if (!rutaImg) return "";
  if (rutaImg.startsWith("data:") || rutaImg.startsWith("http")) return rutaImg;

  let limpia = rutaImg;

  // Si contiene la carpeta de imágenes, extraemos desde ahí para resetear la ruta limpiamente
  if (limpia.includes("IMG/imgProductos/")) {
    limpia = limpia.substring(limpia.lastIndexOf("IMG/imgProductos/"));
    // Añadimos el prefijo del backend una sola vez
    limpia = "backend/src/main/resources/static/" + limpia;
  } else if (!limpia.startsWith("backend/")) {
    // Si no tiene el prefijo y no encontramos la carpeta (caso extraño), intentamos normalizar
    limpia = "backend/src/main/resources/static/IMG/imgProductos/" + limpia.replace(/^(\.\.\/)+/, "").replace("IMG/", "");
  }

  const path = window.location.pathname;

  // Si estamos en una página dentro de /pages/ (HTML/pages/...)
  if (path.includes("/pages/")) {
    return `../../../${limpia}`;
  }

  // Si estamos en la raíz (HTML/index.html)
  return `../../${limpia}`;
}


export function getPathImgsBack(ruta) {
    if (!ruta) {
        return "http://localhost:8080/IMG/imgProductos/default.png";
    }

    // Ya es URL completa
    if (ruta.startsWith("http")) {
        return ruta;
    }

    // Spring Boot
    return `http://localhost:8080${ruta}`;
}




