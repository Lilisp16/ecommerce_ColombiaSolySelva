// Evento submit
form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que recargue la página

    // Selección de elementos
    const form = document.querySelector("form");
    const inputId = document.getElementById("id");
    const inputNombre = document.getElementById("nombre");
    const inputDescripcion = document.getElementById("descripcion");
    const inputCategoria = document.getElementById("categoria");
    const inputImagen = document.getElementById("imagen");
    const inputStock = document.getElementById("stock");
    const inputPrecio = document.getElementById("precio");
    const inputInfo = document.getElementById("infoAdicional");

    // Array para almacenar productos
    let productos = [];

    const file = inputImagen.files[0];

    // FileReader para la imagen
    const reader = new FileReader();
    reader.onload = function (event) {

        // Crear objeto producto
        const producto = {
            id: inputId.value,
            nombre: inputNombre.value,
            descripcion: inputDescripcion.value,
            categoria: inputCategoria.value,
            imagen: event.target.result, // Imagen en Base64
            stock: inputStock.value,
            precio: inputPrecio.value,
            infoAdicional: inputInfo.value
        };

        // Guardar en el array
        productos.push(producto);

        // Mostrar en consola
        console.log("Producto creado:");
        console.log(producto);

        // Limpiar formulario
        form.reset();
        document.getElementById("preview").src = "";
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});