export const initRegistroUsuario = () => {
  const form = document.getElementById("registroForm");
  if (!form) return; // Evita errores si no estamos en la página de registro

  const inputs = form.querySelectorAll("input");
  const submitBtn = form.querySelector("button[type='submit']");

  //  Regex para validar contraseña
  // Mín. 8 caracteres, 1 número, 1 mayúscula, 1 minúscula, sin espacios, sin '\¡¿"ºª·`´çñÑ'
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*\s)(?!.*[\\¡¿"ºª·`´çñÑ]).{8,}$/;

  // Validar campo individual
  function validarCampo(input) {
    if (!input.checkValidity()) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    } else {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      return true;
    }
  }

  // Revisar todo el formulario
  function revisarFormulario() {
    let todosValidos = true;
    inputs.forEach(input => {
      if (!validarCampo(input)) {
        todosValidos = false;
      }
    });

    // Validación especial de contraseña
    const passwordInput = document.getElementById("password");
    if (!passwordRegex.test(passwordInput.value.trim())) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      todosValidos = false;
    } else {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
    }

    submitBtn.disabled = !todosValidos;
  }

  // Eventos de validación en tiempo real
  inputs.forEach(input => {
    input.addEventListener("input", revisarFormulario);
    input.addEventListener("blur", revisarFormulario);
  });

  // Botón inicia deshabilitado
  submitBtn.disabled = true;

  // Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (submitBtn.disabled) {
      form.classList.add("was-validated");
      return;
    }

    const passwordInput = document.getElementById("password");
    const password = passwordInput.value.trim();

    // Validación final de contraseña
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        html: `La contraseña debe cumplir con:<br>
               - Mínimo 8 caracteres<br>
               - Al menos 1 número<br>
               - Al menos 1 mayúscula<br>
               - Al menos 1 minúscula<br>
               - Sin espacios<br>
               - Sin usar \ ¡ ¿ " º ª · \` ´ ç ñ Ñ`,
        confirmButtonColor: "#1B5E20",
        background: "#F5EBDC"
      });
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      return;
    }

    // Crear objeto cliente
    const cliente = {
      nombreCliente: document.getElementById("nombre").value.trim(),
      apellidoCliente: document.getElementById("apellido").value.trim(),
      direccionCliente: document.getElementById("direccion").value.trim(),
      ciudadCliente: document.getElementById("ciudad").value.trim(),
      telCliente: parseInt(document.getElementById("telefono").value),
      correoCliente: document.getElementById("email").value.trim(),
      contrasenaCliente: password
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

      // Registro exitoso
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu cuenta fue creada correctamente.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#1B5E20"
      }).then(() => {
        form.reset();
        inputs.forEach(input =>
          input.classList.remove("is-valid", "is-invalid")
        );
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
