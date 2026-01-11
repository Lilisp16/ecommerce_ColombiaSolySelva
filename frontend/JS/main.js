/* import { buscadorHeader } from "../modulos/buscadorHeader.js" */
import { Carrito } from "./modulos/cart.js";
import { mostrarFooter } from "./modulos/footer.js";
import { mostrarHeader } from "./modulos/header.js";
import { headLinks } from "./modulos/headLinks.js";

document.addEventListener("DOMContentLoaded", () => {
    headLinks();
    mostrarHeader();
    mostrarFooter();
    controlarSesion();
    const carrito = new Carrito("abrirCarrito");
    carrito.inicializar();

    //permite que aparezca el nombre del usuario activo en el header y cambiar el ícono de cerrar sesión
    const nombreUsuarioDiv = document.getElementById("usuLogueado");
    const data = localStorage.getItem("logueado");
    const icono = document.getElementById("iconoSesion");
    const contSesion = document.getElementById("controlSesion");

   if (data) {
        const usuario = JSON.parse(data);

        // Cambiar icono a cerrar sesión
        icono.classList.replace("fa-user", "fa-right-from-bracket");
        contSesion.title="Cerrar Sesión";

        // Mostrar nombre
        if (usuario.nombre && nombreUsuarioDiv) {
            nombreUsuarioDiv.innerHTML = `
                <span class="nombre">${usuario.nombre},</span>
                <span class="bienvenido">Bienvenido</span>
            `;
        }

        // Click → cerrar sesión
        contSesion.addEventListener("click", () => {
            localStorage.removeItem("logueado");
            window.location.href = getPath("catalogo.html");
        });

    } else {
        // Usuario NO logueado → ir a login
        contSesion.addEventListener("click", () => {
            window.location.href = getPath("login.html");
        });
    }
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


function controlarSesion(){
  const contSesion = document.getElementById("controlSesion");

  if (!contSesion) {
    console.warn("Controlarsesion no existe en esta pagina");
    return;
  }
  contSesion.addEventListener("click",(e)=>{
    e.preventDefault();

    const usuActivo = JSON.parse(localStorage.getItem("logueado"));

    if(usuActivo){
      window.location.href = getPath("vistaUsuario.html")
    }else{
      window.location.href = getPath("login.html")
    }
  })
}