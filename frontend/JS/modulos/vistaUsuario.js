import { obtenerUsuarioActual } from "./auth.js";
import { getPath } from "./main.js";

console.log("JWT:", localStorage.getItem("jwt"));

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = await obtenerUsuarioActual();

  if (!usuario) {
    window.location.href = getPath("login.html");
    return;
  }

  console.log("Usuario autenticado:", usuario);
});