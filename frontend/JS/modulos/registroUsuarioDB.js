export const initRegistroUsuario = () => {
  const form = document.getElementById("registroForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input");
  const submitBtn = form.querySelector("button[type='submit']");

  // Regex definitions
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*\s)(?!.*[\\¡¿"ºª·`´çñÑ]).{8,}$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/;
  const phoneRegex = /^[0-9]{7,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validarCampo(input) {
    let isValid = true;
    const value = input.value.trim();

    if (input.id === "nombre" || input.id === "apellido") {
      isValid = nameRegex.test(value);
    } else if (input.id === "telefono") {
      isValid = phoneRegex.test(value);
    } else if (input.id === "email") {
      isValid = emailRegex.test(value);
    } else if (input.id === "password") {
      isValid = passwordRegex.test(value);
    } else if (input.id === "terminos") {
      isValid = input.checked;
    } else {
      isValid = input.checkValidity();
    }

    if (isValid) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }
    return isValid;
  }

  function revisarFormulario() {
    let todosValidos = true;
    inputs.forEach(input => {
      // Solo validamos visualmente si el usuario ya interactuó o el campo no está vacío
      if (input.value !== "" || input.classList.contains("was-validated")) {
        if (!validarCampo(input)) {
          todosValidos = false;
        }
      } else {
        todosValidos = false;
      }
    });
    submitBtn.disabled = !todosValidos;
  }

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      revisarFormulario();
    });
    input.addEventListener("blur", () => {
      validarCampo(input);
      revisarFormulario();
    });
  });

  submitBtn.disabled = true;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    form.classList.add("was-validated");

    let formValido = true;
    inputs.forEach(input => {
      if (!validarCampo(input)) formValido = false;
    });

    if (!formValido) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, revisa que todos los campos cumplan con el formato requerido.",
        confirmButtonColor: "#1B5E20"
      });
      return;
    }

    const cliente = {
      nombreCliente: document.getElementById("nombre").value.trim(),
      apellidoCliente: document.getElementById("apellido").value.trim(),
      direccionCliente: document.getElementById("direccion").value.trim(),
      ciudadCliente: document.getElementById("ciudad").value.trim(),
      telCliente: parseInt(document.getElementById("telefono").value),
      correoCliente: document.getElementById("email").value.trim(),
      contrasenaCliente: document.getElementById("password").value.trim()
    };

    try {
      const res = await fetch("http://localhost:8080/cliente/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
      });

      if (!res.ok) {
        const errorText = await res.text();
        if (errorText.includes("existe")) {
          Swal.fire({
            icon: "error",
            title: "Usuario ya registrado",
            text: "Este correo ya está en uso. Intenta con otro.",
            confirmButtonColor: "#1B5E20"
          });
          return;
        }
        throw new Error(errorText);
      }

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu cuenta fue creada correctamente.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#1B5E20"
      }).then(() => {
        form.reset();
        inputs.forEach(input => input.classList.remove("is-valid", "is-invalid"));
        submitBtn.disabled = true;
        window.location.href = "login.html";
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: error.message || "Ocurrió un error inesperado",
        confirmButtonColor: "#1B5E20"
      });
      console.error(error);
    }
  });
};

