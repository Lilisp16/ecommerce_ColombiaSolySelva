document.addEventListener("DOMContentLoaded", () => {
    
    //LOGIN
    const formLogin = document.getElementById("formLogin");
    if (!formLogin) return; // Sale si no está en login.html

    const inputEmail = document.getElementById("usuarioLogin");
    const inputPassword = document.getElementById("passwordLogin");
    const recordarCheckbox = document.getElementById("recordarLogin");
    const recuperarPasswordBtn = document.getElementById("recuperarPassword");

    if (!inputEmail || !inputPassword || !recordarCheckbox) {
        console.error("Faltan elementos del formulario de login");
        return;
    }

    // Inicializar formulario
    inputEmail.value = "";
    inputPassword.value = "";
    recordarCheckbox.checked = false;

    // Autocompletar usuario recordado
    inputEmail.addEventListener("input", () => {
        const usuariosRecordados =
            JSON.parse(localStorage.getItem("recordarUsuario")) || [];

        const usuario = usuariosRecordados.find(
            u => u.email === inputEmail.value.trim()
        );

        if (usuario) {
            inputPassword.value = usuario.password;
            recordarCheckbox.checked = true;
        } else {
            inputPassword.value = "";
            recordarCheckbox.checked = false;
        }
    });

    // Enviar login
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();
        const recordar = recordarCheckbox.checked;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usu = usuarios.find(
            u => u.email === email && u.password === password
        );

        if (usu) {
            localStorage.setItem("logueado", JSON.stringify(usu));

            let recordarUsuarios =
                JSON.parse(localStorage.getItem("recordarUsuario")) || [];
            recordarUsuarios = recordarUsuarios.filter(u => u.email !== email);

            if (recordar) {
                recordarUsuarios.push({ email, password });
            }

            localStorage.setItem(
                "recordarUsuario",
                JSON.stringify(recordarUsuarios)
            );

            Swal.fire({
                icon: "success",
                title: "Acceso Exitoso",
                text: "Bienvenido a tu sesión",
                confirmButtonColor: "#1B5E20",
                background: "#F5EBDC"
            }).then(() => {
                window.location.href = "vistaUsuario.html";
            });

        } else {
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
            }).then(res => {
                if (res.isConfirmed) {
                    window.location.href = "registro.html";
                }
            });
        }
    });

    // Recuperar Contraseña
    if (recuperarPasswordBtn) {
        recuperarPasswordBtn.addEventListener("click", () => {
            Swal.fire({
                title: "Recuperar Contraseña",
                input: "email",
                confirmButtonColor: "#1B5E20",
                background: "#F5EBDC"
            }).then(result => {
                if (!result.isConfirmed) return;

                const email = result.value.trim();
                const usuarios =
                    JSON.parse(localStorage.getItem("usuarios")) || [];
                const usuario = usuarios.find(u => u.email === email);

                if (!usuario) {
                    Swal.fire("Error", "Usuario no existe", "error");
                    return;
                }

                Swal.fire({
                    title: "Nueva contraseña",
                    input: "password",
                    showCancelButton: true,
                    confirmButtonColor: "#1B5E20",
                    background: "#F5EBDC"
                }).then(res => {
                    if (res.isConfirmed) {
                        usuario.password = res.value;
                        localStorage.setItem(
                            "usuarios",
                            JSON.stringify(usuarios)
                        );
                        Swal.fire("OK", "Contraseña actualizada", "success");
                    }
                });
            });
        });
    }
});

// Cerrar Sesión
const btnCerrarSesion = document.getElementById("cerrarSesion");
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("logueado");
        window.location.href = "../index.html";
    });
}

