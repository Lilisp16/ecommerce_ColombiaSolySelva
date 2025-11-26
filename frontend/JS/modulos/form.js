const nombreUsu=document.getElementById("formContNombre");
const correoUsu=document.getElementById("formContEmail");
const telefonoUsu=document.getElementById("formContTelefono");
const mensajeUsu=document.getElementById("formContMensaje");

const errorNombreUsu=document.getElementById("formContErrorNombre");
const errorMensajeUsu=document.getElementById("formContErrorMensaje");
const errorTelefonoUsu=document.getElementById("formContErrorTelefono");
const errorCorreoUsu=document.getElementById("formContErrorCorreo");

const btnEnviar=document.getElementById("btnEnviarForm")

function validarForm(){
    if (validarNombre() && validarCorreo() && validarMensaje() && validarTelefono()){
        btnEnviar.disabled=false
    }else {
        btnEnviar.disabled=true
    }
}

function validarNombre(){
    const nombreU = nombreUsu.value.trim();

    if (nombreU === ""){
        errorNombreUsu.innerText="Por favor haznos saber tu nombre"
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
        errorCorreoUsu.innerText="Por favor registra tu correo electrónico"
        return false;
    } else if (!correoU.includes("@") || !correoU.includes(".")){
        errorCorreoUsu.innerText="Por favor registra un correo válido"
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
        errorTelefonoUsu.innerText = "Por favor registra un número telefónico válido. Este campo solo acepta números"
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
        errorMensajeUsu.innerText="Por favor déjanos un mensaje"
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
        title: "¡Hemos recibido tu mensaje!",
        text: "Nos pondremos en contacto muy pronto",
        confirmButtonColor: "#A33B20"
      });

      formulario.reset();
    }})
