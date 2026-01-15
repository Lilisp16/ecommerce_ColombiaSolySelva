document.addEventListener("DOMContentLoaded", () => {

    const usuarioActivo = JSON.parse(localStorage.getItem("logueado"));

    // Si no hay usuario logueado, volver al login
    if (!usuarioActivo) {
        window.location.href = "../../HTML/login/login.html";
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

    // Cargar datos actuales en pantalla
    campos.nombre.value = usuarioActivo.nombre;
    campos.apellido.value = usuarioActivo.apellido;
    campos.direccion.value = usuarioActivo.direccion;
    campos.ciudad.value = usuarioActivo.ciudad;
    campos.telefono.value = usuarioActivo.telefono;
    campos.email.value = usuarioActivo.email;

    const btnEditar = document.getElementById("editarInfo");
    const btnCerrar = document.getElementById("cerrarSesion");

    let modoEdicion = false;

    // BOTÓN EDITAR / GUARDAR
    btnEditar.addEventListener("click", () => {

        if (!modoEdicion) {

            // ACTIVAR MODO EDICIÓN
            for (let key in campos) {
                campos[key].disabled = false;
            }

            btnEditar.textContent = "Guardar cambios";
            modoEdicion = true;

        } else {

            // GUARDAR CAMBIOS
            const usuarioActualizado = {
                nombre: campos.nombre.value,
                apellido: campos.apellido.value,
                direccion: campos.direccion.value,
                ciudad: campos.ciudad.value,
                telefono: campos.telefono.value,
                email: campos.email.value
            };

            // Guardar en localStorage
            localStorage.setItem("logueado", JSON.stringify(usuarioActualizado));

            // Deshabilitar nuevamente
            for (let key in campos) {
                campos[key].disabled = true;
            }

            btnEditar.textContent = "Editar información";
            modoEdicion = false;

            // Mensaje de confirmación
            Swal.fire({
                icon: "success",
                title: "Datos actualizados",
                text: "Tu información ha sido guardada correctamente"
            });
        }
    });

    // BOTÓN CERRAR SESIÓN
    btnCerrar.addEventListener("click", () => {
        localStorage.removeItem("logueado");
        localStorage.removeItem("carrito_invitado");

        window.location.href = "../../HTML/pages/login.html";
    });

});


