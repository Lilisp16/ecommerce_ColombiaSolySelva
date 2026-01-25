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

// inputs editables (correo NO va aquí)
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
console.log(usuario);



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


  // Cambiar el título con el nombre
  const perfilTitulo = document.getElementById("perfilTitulo");
  perfilTitulo.textContent = `${usuario.nombreCliente}`;

  bloquearInputs();



  if (usuario.imagenCliente) {
  mostrarFoto(`http://localhost:8080/IMG/imgPerfiles/${usuario.imagenCliente}`);
} else {
  mostrarFotoDefecto();
}

  
});


// BLOQUEAR / DESBLOQUEAR

function bloquearInputs() {
  inputsEditables.forEach(i => i.disabled = true);
  inputCorreo.disabled = true; //  correo siempre bloqueado
}

function habilitarEdicion() {
  inputsEditables.forEach(i => i.disabled = false);
  inputCorreo.disabled = true; //  nunca editable
  inputCorreo.classList.add("text-muted");
}


// EDITAR PERFIL

btnEditar.addEventListener("click", async () => {
  // Si los inputs bloqueados -> habilitar edición
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
      confirmButtonColor: "#1B5E20",
      background: '#F5EBDC'
    });

    bloquearInputs();
    btnEditar.textContent = "Editar información";

  } catch (error) {                                                   //si algo sale mal, captura el error para manejarlo sin que rompa la página.
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el perfil",
      background: '#F5EBDC'
    });
  }
});




// CERRAR SESIÓN
btnCerrarSesion.addEventListener("click", () => {
  localStorage.removeItem("jwt"); // Borra token
   


    // Redirige al index
  window.location.href = "../../HTML/index.html"; 
});



  

// CAMBIAR / ELIMINAR FOTO

// Botones foto
const btnCambiarFoto = document.getElementById("cambiarFoto");
const btnEliminarFoto = document.getElementById("eliminarFoto");

// Imagen de perfil
const profilePic = document.getElementById("profilePic");

// Función para mostrar foto por defecto
function mostrarFotoDefecto() {
  profilePic.style.display = "none";              // oculta <img>
  profilePic.insertAdjacentHTML("afterend", '<i class="fas fa-user profile-pic"></i>');
}

function mostrarFoto(url) {
  profilePic.style.display = "block";
  profilePic.src = url;
  const icono = profilePic.parentElement.querySelector("i");
  if (icono) icono.remove(); // elimina el ícono si existe
}


// Subir foto
btnCambiarFoto.addEventListener("click", () => {
  const inputFile = document.createElement("input");
  inputFile.type = "file";
  inputFile.accept = "image/*";

  inputFile.addEventListener("change", async () => {
    const file = inputFile.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);

    const usuarioActual = await obtenerUsuarioActual();

    try {
      const res = await fetch(
        `http://localhost:8080/cliente/foto/${usuarioActual.idCliente}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
          },
          body: formData
        }
      );

      if (!res.ok) throw new Error("Error al subir foto");

      const data = await res.json();

              //  volver a pedir el usuario actualizado -- error al cargar automaticamente por eso se vuelve a pedir
        const usuarioActualizado = await obtenerUsuarioActual();

        mostrarFoto(
          `http://localhost:8080/IMG/imgPerfiles/${usuarioActualizado.imagenCliente}?t=${Date.now()}`
        );

      
     

      Swal.fire({
        icon: "success",
        title: "Foto actualizada",
        confirmButtonColor: "#1B5E20",
        background: '#F5EBDC',
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Su imagen debe ser menor a 1 MB",
        background: '#F5EBDC',
        confirmButtonColor: "#1B5E20"
      });
    }
  });

  inputFile.click();
});

// Eliminar foto
btnEliminarFoto.addEventListener("click", async () => {
  const usuarioActual = await obtenerUsuarioActual();

  try {
    const res = await fetch(
      `http://localhost:8080/cliente/foto/${usuarioActual.idCliente}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      }
    );

    if (!res.ok) throw new Error("Error al eliminar foto");

    // Pone imagen por defecto
    mostrarFotoDefecto();

    Swal.fire({
      icon: "success",
      title: "Foto eliminada",
      confirmButtonColor: "#1B5E20"
    });

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar la foto",
      confirmButtonColor: "#1B5E20"
    });
  }

});



// PARA CAMBIAR CONTRASEÑA

const btnActualizarPassword = document.getElementById("editarContrasena");

// Obtener inputs
const inputActual = document.querySelector('#v-pills-password input[name="actual"]');
const inputNueva = document.querySelector('#v-pills-password input[name="nueva"]');



// Validación en tiempo real para nueva contraseña
const passwordRules = document.getElementById("passwordRules");

inputNueva.addEventListener("input", () => {
    const value = inputNueva.value;

    // Regex para reglas
    const cumpleRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
    const tieneProhibidos = /[\\¡¿"ºª·`´çñÑ\s]/.test(value);

    if (!value) {
        inputNueva.classList.remove("is-invalid", "is-valid");
        passwordRules.style.display = "none";
        return;
    }

    if (cumpleRegex && !tieneProhibidos) {
        inputNueva.classList.add("is-valid");
        inputNueva.classList.remove("is-invalid");
        passwordRules.style.display = "none";
    } else {
        inputNueva.classList.add("is-invalid");
        inputNueva.classList.remove("is-valid");
        passwordRules.style.display = "block";
    }
});




const inputConfirmar = document.querySelector('#v-pills-password input[name="confirmar"]');
inputConfirmar.addEventListener("input", () => {
    if (inputConfirmar.value === inputNueva.value) {
        inputConfirmar.classList.add("is-valid");
        inputConfirmar.classList.remove("is-invalid");
    } else {
        inputConfirmar.classList.add("is-invalid");
        inputConfirmar.classList.remove("is-valid");
    }
});




 // Mostrar / ocultar contraseña
    document.querySelectorAll('.toggle-password').forEach(icono => {
  icono.addEventListener('click', () => {
    const input = document.querySelector(icono.dataset.target);
    if (input.type === 'password') {
      input.type = 'text';
      icono.classList.remove('fa-eye');
      icono.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icono.classList.remove('fa-eye-slash');
      icono.classList.add('fa-eye');
    }
  });
});



    

function actualizarEstadoBoton() {
    const nuevaValida = inputNueva.classList.contains("is-valid");
    const confirmarCoincide = inputConfirmar.classList.contains("is-valid");
    btnActualizarPassword.disabled = !(nuevaValida && confirmarCoincide);
}

// Llamar cada vez que cambien los inputs
inputNueva.addEventListener("input", actualizarEstadoBoton);
inputConfirmar.addEventListener("input", actualizarEstadoBoton);

// Inicialmente
btnActualizarPassword.disabled = true;




// Función para mostrar alertas con SweetAlert2
function mostrarAlerta(mensaje, tipo = 'success') {
    Swal.fire({
        text: mensaje,
        icon: tipo, 
        confirmButtonText: 'Aceptar',
        confirmButtonColor: tipo === 'success' ? '#1B5E20' : '#D4AF37',
        background: '#F5EBDC', //  color de fondo
        iconColor: tipo === 'success' ? '#4CAF50' : '#dc3545', // verde para éxito, rojo para error
        timer: tipo === 'success' ? 3000 : undefined,
        timerProgressBar: tipo === 'success',
    });
}

// Función para cambiar contraseña
async function cambiarContrasena() {
    const actual = inputActual.value.trim();
    const nueva = inputNueva.value.trim();
    const confirmar = inputConfirmar.value.trim();

    // Validaciones
    if (!actual || !nueva || !confirmar) {
        mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (nueva !== confirmar) {
        mostrarAlerta('La nueva contraseña no coincide', 'error');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/cliente/cambiar-contrasena`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({ actual, nueva, confirmar })
            

            
        });

        const data = await response.text();

        if (response.ok) {
            mostrarAlerta('Contraseña actualizada con éxito', 'success');
            inputActual.value = '';
            inputNueva.value = '';
            inputConfirmar.value = '';
        } else {
            mostrarAlerta('Contraseña actual incorrecta', 'error');
        }

    } catch (error) {
        console.error(error);
        mostrarAlerta('Error al actualizar la contraseña', 'error');
    }
}

// Escuchar clic en el botón
btnActualizarPassword.addEventListener('click', cambiarContrasena);
