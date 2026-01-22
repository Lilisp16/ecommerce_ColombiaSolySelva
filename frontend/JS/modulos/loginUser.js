const API_URL = "http://localhost:8080/cliente/loginConDTO";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if (!form) return;

  const inputEmail = document.getElementById("usuarioLogin");
  const inputPassword = document.getElementById("passwordLogin");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const correo = usuarioLogin.value.trim();
    const pass = passwordLogin.value.trim();

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
        text: "Datos incorrectos",
        confirmButtonText: "Crear cuenta",
        showCancelButton: true,
        confirmButtonColor: "#1B5E20",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#1B5E20",
        background: "#F5EBDC"
    })
      return;
    }

    const token = await res.text();
    localStorage.setItem("jwt", token);
    localStorage.setItem("usuario", JSON.stringify({
    nombreCliente: inputEmail.value.split("@")[0],
    correoCliente: inputEmail.value
    }));

    
    Swal.fire({
        icon: "success",
        title: "Acceso Exitoso",
        text: "Bienvenido a tu sesión",
        confirmButtonColor: "#1B5E20",
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
  });
});







    // Enviar login
    // formLogin.addEventListener("submit", async(e) => {
    //     e.preventDefault();

    //     const email = inputEmail.value.trim();
    //     const password = inputPassword.value.trim();
    //     const recordar = recordarCheckbox.checked;

    //     const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    //     const usu = usuarios.find(
    //         u => u.email === email && u.password === password
    //     );

    //     if (usu) {
    //         localStorage.setItem("logueado", JSON.stringify(usu));

    //         let recordarUsuarios =
    //             JSON.parse(localStorage.getItem("recordarUsuario")) || [];
    //             recordarUsuarios = recordarUsuarios.filter(u => u.email !== email);

    //         if (recordar) {
    //             recordarUsuarios.push({ email, password });
    //         }

    //         localStorage.setItem("recordarUsuario", JSON.stringify(recordarUsuarios));

    //         if(usu.rol ==="admin"){
    //             window.location.href = getPath("vistaAdministrador.html");
    //         } else{
    //         Swal.fire({
    //             icon: "success",
    //             title: "Acceso Exitoso",
    //             text: "Bienvenido a tu sesión",
    //             confirmButtonColor: "#1B5E20",
    //             background: "#F5EBDC"
    //         }).then(() => {
    //             window.location.href = "vistaUsuario.html";
    //         });
    //     }
    //     } else {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Acceso Denegado",
    //             text: "Datos incorrectos",
    //             confirmButtonText: "Crear cuenta",
    //             showCancelButton: true,
    //             confirmButtonColor: "#1B5E20",
    //             cancelButtonText: "Cancelar",
    //             cancelButtonColor: "#1B5E20",
    //             background: "#F5EBDC"
    //         }).then(res => {
    //             if (res.isConfirmed) {
    //                 window.location.href = "registro.html";
    //             }
    //         });
    //     }
