const API_URL = "http://localhost:8080/cliente/loginConDTO";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if (!form) return;

  const inputEmail = document.getElementById("usuarioLogin");
  const inputPassword = document.getElementById("passwordLogin");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const correo = inputEmail.value.trim();
    const pass = inputPassword.value.trim();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correoCliente: correo,
          contrasenaCliente: pass
        })
      });

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Acceso Denegado",
          text: "Correo o contraseña incorrectos",
          confirmButtonText: "Intentar de nuevo",
          confirmButtonColor: "#1B5E20",
          background: "#F5EBDC"
        });
        return;
      }

      const token = await res.text();
      localStorage.setItem("jwt", token);
      localStorage.setItem("logueado", correo); // Para compatibilidad con otras partes del código

      Swal.fire({
        icon: "success",
        title: "Acceso Exitoso",
        text: "Bienvenido",
        timer: 1500,
        showConfirmButton: false,
        background: "#F5EBDC"
      }).then(() => {
        const redirect = sessionStorage.getItem("redirectAfterLogin");
        if (redirect) {
          sessionStorage.removeItem("redirectAfterLogin");
          window.location.href = redirect;
        } else {
          window.location.href = "vistaUsuario.html";
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
        confirmButtonColor: "#1B5E20"
      });
    }
  });
});
