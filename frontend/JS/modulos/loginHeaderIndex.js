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

  nombreUsuarioDiv.style.display = "inline-block"
  nombreUsuarioDiv.innerHTML = 
  `<div>${usuario.nombreCliente}</div>
  <div>Bienvenid@</div>`
  btnCerrarSesion.style.display = "inline-block";

  btnCerrarSesion.addEventListener("click", cerrarSesion);
};

