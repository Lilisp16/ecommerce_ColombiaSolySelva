//Validación de acceso

document.addEventListener("DOMContentLoaded", ()=>{
    const formLogin = document.getElementById("formLogin");
    const inputEmail = document.getElementById("usuarioLogin");
    const inputPassword = document.getElementById("passwordLogin");
    const recordarCheckbox = document.getElementById("recordarLogin");

    // Inicia con el formulario limpio
    inputEmail.value ="";
    inputPassword.value="";
    recordarCheckbox.checked=false;

    // Autocompletar si el usuario anteriormente ingresó y marcó el check de recordar
    inputEmail.addEventListener("input",()=>{
        const usuariosRecordados = JSON.parse(localStorage.getItem("recordarUsuario")) || [];
        const usuario = usuariosRecordados.find( u=> u.email === inputEmail.value.trim());
        if (usuario){
            inputPassword.value = usuario.password;
            recordarCheckbox.checked = true;
        } else {
            inputPassword.value = "";
            recordarCheckbox.checked = false;
        }
    });

    formLogin.addEventListener("submit", function(e){
        e.preventDefault();
    
    const usuarioLogin = inputEmail.value.trim();
    const passwordLogin = inputPassword.value.trim();
    const recordar = recordarCheckbox.checked;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usu = usuarios.find(u => u.email === usuarioLogin && u.password === passwordLogin);

    if (usu){
        //Guarda los datos que el usuario está ingresando
        localStorage.setItem("logueado", JSON.stringify(usu));

        //Si el usuario dio check a Recordar, guarda los datos
        let recordarUsuarios = JSON.parse(localStorage.getItem("recordarUsuario")) || [];
        recordarUsuarios = recordarUsuarios.filter( u=> u.email !== usuarioLogin);

        if(recordar){
            recordarUsuarios.push({email:usuarioLogin, password:passwordLogin});
        }
        localStorage.setItem("recordarUsuario",JSON.stringify(recordarUsuarios));
            
        Swal.fire({
            icon: 'success',          
            title: 'Acceso Exitoso',
            text: 'Bienvenido a tu sesión',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#1B5E20',
            background: '#F5EBDC'
        }).then(() => {
            window.location.href = "vistaUsuario.html"
            formLogin.reset();       
            });
    } else {
        Swal.fire({
            icon: 'error',          
            title: 'Acceso Denegado',
            text: 'El usuario no se encuentra registrado o los datos son incorrectos.',
            confirmButtonText: 'Crear una cuenta',
            showCancelButton: true,
            cancelButtonText: 'Corregir Datos',
            confirmButtonColor: '#1B5E20',
            cancelButtonColor:  '#1B5E20',
            background: '#F5EBDC'
        }).then((result) => {
            if (result.isConfirmed){
                window.location.href = "registro.html"
            }
        });
    }
})
document.getElementById("recuperarPassword").addEventListener("click", () => {
    Swal.fire({
        title: 'Recuperar Contraseña',
        input: 'email',
        inputLabel: 'Ingresa tu correo registrado',
        inputPlaceholder: 'correo@dominio.com',
        confirmButtonText: 'Validar',
        confirmButtonColor: '#1B5E20',
        background: '#F5EBDC'
    }).then((result) => {
        if (result.isConfirmed) {
            const email = result.value.trim();
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.email === email);

            if (usuario) {
                // Pedir nueva contraseña
                Swal.fire({
                    title: 'Ingresa tu nueva contraseña',
                    input: 'password',
                    inputPlaceholder: 'Nueva contraseña',
                    inputAttributes: { maxlength: 20 },
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    confirmButtonColor: '#1B5E20',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#1B5E20',
                    background: '#F5EBDC'
                }).then((res) => {
                    if (res.isConfirmed) {
                        usuario.password = res.value;
                        localStorage.setItem("usuarios", JSON.stringify(usuarios));
                        Swal.fire({
                            icon: 'success',
                            title: 'Contraseña Actualizada',
                            text: 'Tu clave ha si actualizada correctamente',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#1B5E20',
                            background: '#F5EBDC'
                        });
                        
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario Inexistente',
                    text: 'El usuario ingresado no se encuentra registrado en nuestra base de datos',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#1B5E20',
                    background: '#F5EBDC'                    
                });
            }
        }
    });
});
});

//Cerrar Sesion
document.getElementById("cerrarSesion").addEventListener("click", cerrarSesion);

function cerrarSesion() {
    localStorage.removeItem("logueado"); // elimina la sesión
    window.location.href = "../index.html";
}


