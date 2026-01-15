const nombreUsu=document.getElementById("formContNombre");
const correoUsu=document.getElementById("formContEmail");
const telefonoUsu=document.getElementById("formContTelefono");
const mensajeUsu=document.getElementById("formContMensaje");
const aceptacionTtoDatos = document.getElementById("checkDatosPersonales");
const aceptacionGarantias = document.getElementById("checkGarantias");

const errorNombreUsu=document.getElementById("formContErrorNombre");
const errorMensajeUsu=document.getElementById("formContErrorMensaje");
const errorTelefonoUsu=document.getElementById("formContErrorTelefono");
const errorCorreoUsu=document.getElementById("formContErrorCorreo");

const btnEnviar=document.getElementById("btnEnviarForm")

function validarForm(){
    if (validarNombre() && validarCorreo() && validarMensaje() && validarTelefono() && validarchecks()){
        btnEnviar.disabled=false
    }else {
        btnEnviar.disabled=true
    }
}

function validarchecks(){
    return(aceptacionTtoDatos.checked && aceptacionGarantias.checked)

}

function validarNombre(){
    const nombreU = nombreUsu.value.trim();

    if (nombreU === ""){
        errorNombreUsu.innerText="Por favor ingrese su nombre"
        return false;
    } else {
        errorNombreUsu.innerText=""
        return true;
    };
};

nombreUsu.addEventListener("blur",()=>{
    validarNombre();
    validarForm();
})

function validarCorreo(){
    const correoU = correoUsu.value.trim();
    if (correoU === ""){
        errorCorreoUsu.innerText="Por favor registra su correo electrónico"
        return false;
    } else if (!correoU.includes("@") || !correoU.includes(".")){
        errorCorreoUsu.innerText="Por favor registre un correo válido"
        return false;
    } else {
        errorCorreoUsu.innerText=""
        return true;
    }
};
correoUsu.addEventListener("blur",()=>{
    validarCorreo();
    validarForm();
})

const validarTelefono = () =>{
    telefonoUsu.value = telefonoUsu.value.replace(/[^0-9]/g,"");
    const telefonoU = telefonoUsu.value.trim();
    if (telefonoU===""){
        errorTelefonoUsu.innerText = "Por favor registre un número telefónico válido. Este campo solo acepta números"
        return false;
    } else if (telefonoU.length!==10){
        errorTelefonoUsu.innerText = "El teléfono debe contener 10 caracteres numéricos"
        return false;
    } else{
        errorTelefonoUsu.innerText = ""
        return true;
    };
};

telefonoUsu.addEventListener("input", ()=>{
    validarTelefono();
    validarForm();
});
telefonoUsu.addEventListener("blur", ()=>{
    validarTelefono();
    validarForm();
});


function validarMensaje(){
    const mensajeU = mensajeUsu.value.trim();

    if (mensajeU === ""){
        errorMensajeUsu.innerText="Por favor déjenos su mensaje"
        return false;
    } else {
        errorMensajeUsu.innerText=""
        return true;
    }
};
mensajeUsu.addEventListener("blur",()=>{
    validarMensaje();
    validarForm();
})

document.getElementById("formContacto").addEventListener("submit", async function (e) {
    e.preventDefault()
    const formulario = e.target;

    const response = await fetch("https://formspree.io/f/mgvbdywe", {
      method: "POST",
      body: new FormData(formulario),
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Hemos recibido su mensaje!",
        text: "Nos pondremos en contacto muy pronto",
        confirmButtonColor: '#1B5E20'
      });

      formulario.reset();
    }})

        // Lógica del acordeón FAQ
    const preguntas = document.querySelectorAll(".pregunta");

    preguntas.forEach(pregunta => {
      pregunta.addEventListener("click", () => {
        const respuesta = pregunta.nextElementSibling;
        
        // Abrir/cerrar
        respuesta.style.display = 
          respuesta.style.display === "block" ? "none" : "block";
      });
    });