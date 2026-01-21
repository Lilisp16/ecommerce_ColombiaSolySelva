import { obtenerUsuarioActual, cerrarSesion } from "./auth.js";
import { getPath } from "../main.js";

document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("jwt");

  // Si no hay token → login
  if (!token) {
    window.location.href = getPath("login.html");
    return;
  }

  // Pedir usuario al backend
  const usuarioActivo = await obtenerUsuarioActual();

  // Si token inválido o expirado → login
  if (!usuarioActivo) {
    localStorage.removeItem("jwt");
    window.location.href = getPath("login.html");
    return;
  }

  // Referencias a los inputs
  const campos = {
    nombre: document.getElementById("perfilNombre"),
    apellido: document.getElementById("perfilApellido"),
    direccion: document.getElementById("perfilDireccion"),
    ciudad: document.getElementById("perfilCiudad"),
    telefono: document.getElementById("perfilTelefono"),
    email: document.getElementById("perfilEmail")
  };

  // Cargar datos reales del backend
  campos.nombre.value = usuarioActivo.nombreCliente;
  campos.apellido.value = usuarioActivo.apellidoCliente;
  campos.direccion.value = usuarioActivo.direccionCliente;
  campos.ciudad.value = usuarioActivo.ciudadCliente;
  campos.telefono.value = usuarioActivo.telCliente;
  campos.email.value = usuarioActivo.correoCliente;

  const btnEditar = document.getElementById("editarInfo");
  const btnCerrar = document.getElementById("cerrarSesion");

  let modoEdicion = false;

  btnEditar.addEventListener("click", () => {
    if (!modoEdicion) {
      Object.values(campos).forEach(c => c.disabled = false);
      btnEditar.textContent = "Guardar cambios";
      modoEdicion = true;
    } else {
      Object.values(campos).forEach(c => c.disabled = true);
      btnEditar.textContent = "Editar información";
      modoEdicion = false;

      Swal.fire({
        icon: "success",
        title: "Datos actualizados",
        text: "Los cambios se guardarán en el backend"
      });
    }
  });

  btnCerrar.addEventListener("click", cerrarSesion);
});