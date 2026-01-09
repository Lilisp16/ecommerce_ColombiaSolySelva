const form = document.getElementById("registroForm");
const inputs = form.querySelectorAll("input, select");
const submitBtn = form.querySelector("button[type='submit']");

// Función para validar cada input individual
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

// Función para revisar todo el formulario y para activar/desactivar el botón
function revisarFormulario() {
    let todosValidos = true;
    inputs.forEach(input => {
        if (!validarCampo(input)) {
            todosValidos = false;
        }
    });
    submitBtn.disabled = !todosValidos;  // no se actica hasta que los todos los input sean validos
}

// Validación mientras el usuario escribe
inputs.forEach(input => {
    input.addEventListener("input", revisarFormulario);
    input.addEventListener("blur", revisarFormulario);
});

// Iniciamos con boton desactivado
submitBtn.disabled = true;


// funcion para guardar usuario en localStorage
function registrarUsuario(){
    const usuario = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        direccion: document.getElementById("direccion").value,
        ciudad: document.getElementById("ciudad").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
       
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    

    //SweetAlert registro exitoso
        Swal.fire({
            icon: 'success',          
            title: '¡Registro exitoso!',
            text: 'Usuario registrado correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#1B5E20'
        }).then(() => {
            form.reset();                       // Limpiar formulario
            inputs.forEach(input => input.classList.remove("is-valid", "is-invalid"));
            submitBtn.disabled = true;          
        });


    console.log(JSON.parse(localStorage.getItem("usuarios")));


}

//evento submit  - validacion final de todo el fomulario 

form.addEventListener("submit", function(event){
    event.preventDefault();

      // Si el botón está deshabilitado, muestra los mensajes de error
        if(submitBtn.disabled) {
        form.classList.add("was-validated"); 
        return;  
    }

    registrarUsuario();
});
