import { obtenerUsuarioActual, cerrarSesion } from "./auth.js";
import { getPath } from "../main.js";

export const mostrarLogin = async () => {
  const logIn = document.getElementById("logIn");
  const logOut = document.getElementById("logOut");
  const nombreUsuarioDiv = document.getElementById("usuLogueado");
  const btnCerrarSesion = document.getElementById("botonCerrarSesion")

  const usuario = await obtenerUsuarioActual();

  // Lógica para marcar el link activo
  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link.link-custom").forEach(link => {
    const href = link.getAttribute("href");
    const linkPage = href.split("/").pop();

    if (currentPage === linkPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    }
  });


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



   // Mostrar foto de perfil si existe en header general
        if (usuario.imagenCliente) {
            profileHeaderPic.src = `http://localhost:8080/IMG/imgPerfiles/${usuario.imagenCliente}?t=${new Date().getTime()}`;
            profileHeaderPic.style.display = "inline-block";

            // Ocultar icono genérico
            logIn.style.display = "none";

            profileHeaderPic.addEventListener("click", () => {
                window.location.href = getPath("vistaUsuario.html");
            });
        }
};


