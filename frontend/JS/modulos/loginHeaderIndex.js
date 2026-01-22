import { obtenerUsuarioActual, cerrarSesion } from "./auth.js";
import { getPath } from "../main.js";

export const mostrarLogin = async () => {
  const logIn = document.getElementById("logIn");
  const logOut = document.getElementById("logOut");
  const nombreUsuarioDiv = document.getElementById("usuLogueado");
  const btnCerrarSesion = document.getElementById("botonCerrarSesion")

  const usuario = await obtenerUsuarioActual();

  if (!usuario) {
    nombreUsuarioDiv.style.display = "none";    
    logOut.style.display = "none";
    logIn.addEventListener("click", () => {
      window.location.href = getPath("login.html");
    });
    return;
  }




  // Usuario logueado
  nombreUsuarioDiv.style.display = "inline-block";
  nombreUsuarioDiv.innerHTML = `
    <div>${usuario.nombreCliente}</div>
    <div>Bienvenid@</div>
  `;
  btnCerrarSesion.style.display = "inline-block";

  // Cerrar sesión
  btnCerrarSesion.addEventListener("click", cerrarSesion);

  
// Click al icono ir al perfil - vista de usuario
logIn.addEventListener("click", () => {
  window.location.href = getPath("vistaUsuario.html");
});





  //COMPRAR 
  const btnComprar = document.getElementById("finalizarCompra");

  if (btnComprar) {
    btnComprar.addEventListener("click", () => {

      if (usuario) {
        // Usuario logueado -> pagos
        window.location.href = getPath("vistaPagos.html");
      } else {
        // Usuario NO logueado -> login
        localStorage.setItem("redirectAfterLogin", "vistaPagos.html");
        window.location.href = getPath("login.html");
      }

    });
  }
 
};

