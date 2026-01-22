import { obtenerUsuarioActual } from "./auth.js";

// Botones
const btnEditar = document.getElementById("editarInfo");
const btnCerrarSesion = document.getElementById("cerrarSesion");

// Inputs
const inputNombre = document.getElementById("perfilNombre");
const inputApellido = document.getElementById("perfilApellido");
const inputDireccion = document.getElementById("perfilDireccion");
const inputCiudad = document.getElementById("perfilCiudad");
const inputTelefono = document.getElementById("perfilTelefono");
const inputCorreo = document.getElementById("perfilEmail");

// 🔹 inputs editables (correo NO va aquí)
const inputsEditables = [
  inputNombre,
  inputApellido,
  inputDireccion,
  inputCiudad,
  inputTelefono
];


// CARGAR PERFIL
document.addEventListener("DOMContentLoaded", async () => {
  const usuario = await obtenerUsuarioActual();



  //Al cargar la página verifica si hay un usuario logueado
  if (!usuario) {
   // Si NO hay usuario, redirige automáticamente al login
    window.location.href = "../../pages/login.html"; 
    return;
  }

  // Llenar inputs con info del usuario
  inputNombre.value = usuario.nombreCliente;
  inputApellido.value = usuario.apellidoCliente;
  inputDireccion.value = usuario.direccionCliente;
  inputCiudad.value = usuario.ciudadCliente;
  inputTelefono.value = usuario.telCliente;
  inputCorreo.value = usuario.correoCliente;

  bloquearInputs();
});


// BLOQUEAR / DESBLOQUEAR

function bloquearInputs() {
  inputsEditables.forEach(i => i.disabled = true);
  inputCorreo.disabled = true; // 🔒 correo siempre bloqueado
}

function habilitarEdicion() {
  inputsEditables.forEach(i => i.disabled = false);
  inputCorreo.disabled = true; // 🔒 nunca editable
}


// EDITAR PERFIL

btnEditar.addEventListener("click", async () => {
  // Si los inputs están bloqueados → habilitar edición
  if (inputsEditables[0].disabled) {
    habilitarEdicion();
    btnEditar.textContent = "Guardar cambios";
    return;
  }

  // Guardar cambios
  const usuarioActual = await obtenerUsuarioActual();
  const clienteActualizado = {
    nombreCliente: inputNombre.value,
    apellidoCliente: inputApellido.value,
    direccionCliente: inputDireccion.value,
    ciudadCliente: inputCiudad.value,
    telCliente: parseInt(inputTelefono.value)
  };


  try {                                                              //intenta ejecutar el código que puede fallar (por ejemplo, una petición al servidor).
    const res = await fetch(
      `http://localhost:8080/cliente/editar/${usuarioActual.idCliente}`,
      {
        method: "PUT",                                                //indica que queremos modificar un recurso existente
        headers: {                                                    //especifica que enviamos JSON y autorizamos con un token JWT que está en localStorage que dura el tiempo que pasemos en el codigo java
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(clienteActualizado)                      //envía los datos nuevos del usuario en formato JSON (clienteActualizado)
      }
    );

    if (!res.ok) throw new Error("Error al actualizar perfil");

    Swal.fire({
      icon: "success",
      title: "Perfil actualizado",
      text: "Tus datos se guardaron correctamente",
      confirmButtonColor: "#1B5E20"
    });

    bloquearInputs();
    btnEditar.textContent = "Editar información";

  } catch (error) {                                                   //si algo sale mal, captura el error para manejarlo sin que rompa la página.
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el perfil"
    });
  }
});




// CERRAR SESIÓN
btnCerrarSesion.addEventListener("click", () => {
  localStorage.removeItem("jwt"); // Borra token
   
  
  
  // Redirige al index
  window.location.href = "../../HTML/index.html"; 
});
