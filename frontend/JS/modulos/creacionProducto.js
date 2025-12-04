import { LocalStorage } from "./localStorage.js";

const productStorage = new LocalStorage('productos', []);

const form = document.getElementById("creacionProducto");
const inputId = form.querySelector("#id");
const inputNombre = form.querySelector("#nombre");
const inputDescripcion = form.querySelector("#descripcion");
const inputCategoria = form.querySelector("#categoria");
const inputImagen = form.querySelector("#imagen");
const inputStock = form.querySelector("#stock");
const inputPrecio = form.querySelector("#precio");
const inputInfo = form.querySelector("#infoAdicional");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
     productStorage.validar();
    let productos = productStorage.obtener(); 
    
    if (!Array.isArray(productos)) {
        productos = [];
    }
    
    const file = inputImagen.files[0];

    const reader = new FileReader();
    
    // Esta función se ejecuta ASÍNCRONAMENTE cuando la imagen se carga.
    reader.onload = function (event) {
        
    
        const producto = {
            id: inputId.value,
            nombre: inputNombre.value,
            descripcion: inputDescripcion.value,
            categoria: inputCategoria.value,
            imagen: event.target.result,
            stock: inputStock.value,
            precio: inputPrecio.value,
            infoAdicional: inputInfo.value
        };

        productos.push(producto);
        productStorage.actualizar(productos);
        
        console.log("Productos guardados:", productos);

        // Limpiar formulario
        form.reset();
        document.getElementById("preview").src = "";
        alert("🎉 Producto Creado Exitosamente");
    };

    if (file) {
        // Inicia la lectura asíncrona del archivo
        reader.readAsDataURL(file);
    } else {
        // Manejar el caso donde no hay imagen seleccionada
        alert("Por favor, selecciona una imagen para el producto.");
    }
});