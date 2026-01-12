/* import { buscadorHeader } from "../modulos/buscadorHeader.js" */
import { Carrito } from "./modulos/cart.js";
import { mostrarFooter } from "./modulos/footer.js";
import { mostrarHeader } from "./modulos/header.js";
import { headLinks } from "./modulos/headLinks.js";

document.addEventListener("DOMContentLoaded", () => {
    headLinks();
    mostrarHeader();
    mostrarFooter();
    crearUsuAdmin();

    const carrito = new Carrito("abrirCarrito");
    carrito.inicializar();

    //permite que aparezca el nombre del usuario activo en el header y cambiar el ícono de cerrar sesión
    const nombreUsuarioDiv = document.getElementById("usuLogueado");
    const logIn = document.getElementById("logIn");
    const logOut = document.getElementById("logOut")  
    
    
    const data = localStorage.getItem("logueado");
    if(!data){
      logIn.addEventListener("click", () => {
        window.location.href = getPath("login.html");
      });
    }else {
        const usuario = JSON.parse(data);
        logOut.style.display= "inline-block";

        // Mostrar nombre
        if(nombreUsuarioDiv&&usuario){
          if(usuario.rol==="admin"){
            logIn.addEventListener("click", () => {
            window.location.href = getPath("vistaAdministrador.html");
            })
            nombreUsuarioDiv.innerHTML = `
                <span class="nombre">${usuario.nombre},</span>
                <span class="bienvenido">Acceso Total</span>
            `;  
          }else{
            logIn.addEventListener("click", () => {
            window.location.href = getPath("vistaUsuario.html");
            })
            nombreUsuarioDiv.innerHTML = `
                <span class="nombre">${usuario.nombre},</span>
                <span class="bienvenido">Bienvenid@</span>
            `;
        }
      }
      }
      
      // Click para cerrar sesión

      logOut.addEventListener("click", (e) => {
          e.preventDefault(); // 

      if (data){
          localStorage.removeItem("logueado");
          Swal.fire({
              icon: 'success',
              title: 'Sesión cerrada exitosamente',
              text: 'Gracias por visitarnos. Esperamos verte pronto.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#1B5E20'
          }).then(() => {
              window.location.href = getPath("catalogo.html");
          });
      } else {
        // Usuario NO logueado → ir a login
        contSesion.addEventListener("click", () => {
            window.location.href = getPath("login.html");
        });
    }
});
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


function controlarSesion(){
  const logIn = document.getElementById("controlSesion");

  if (!logIn) {
    return;
  }
  logIn.addEventListener("click",(e)=>{
    e.preventDefault();

    const usuActivo = JSON.parse(localStorage.getItem("logueado"));

    if(usuActivo){
      window.location.href = getPath("vistaUsuario.html")
    }else{
      window.location.href = getPath("login.html")
    }
  })
}

//usuario administrador
function crearUsuAdmin (){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const administrador = usuarios.some(u=>u.rol==="admin");

  if(!administrador){
    const admin={
      nombre: "Administrador",
      email:"admin@css.com",
      password:"admincss",
      rol:"admin"
    }

    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Usuario administrador creado");
  }
}