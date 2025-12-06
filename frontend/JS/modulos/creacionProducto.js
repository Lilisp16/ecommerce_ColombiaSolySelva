import { LocalStorage } from "./localStorage.js";
import { nuevoProducto } from "./cartItem.js";
import { crearTarjeta } from "./crearTarjeta.js";


const productStorage = new LocalStorage('productos', []);

// --- Elementos del Formulario (Mantener) ---

const form = document.getElementById("creacionProducto");
const inputId = form.querySelector("#id");
const inputNombre = form.querySelector("#nombre");
const inputDescripcion = form.querySelector("#descripcion");
const inputCategoria = form.querySelector("#categoria");
const inputImagen = form.querySelector("#imagen");
const imagenPreview = form.querySelector("#preview");

const inputStock = form.querySelector("#stock");
const inputPrecio = form.querySelector("#precio");
const inputInfo = form.querySelector("#infoAdicional");

const btnSubmit = form.querySelector("button[type='submit']") || form.querySelector("button");


const contenedorRecientes = document.getElementById("contenedorAgregadosRecientemente");



function mostrarUltimosProductos(productos) {
    if (!productos || productos.length === 0) {
    if (contenedorRecientes) {
     contenedorRecientes.innerHTML = '<p>No hay productos guardados aún.</p>';
    }
    return;
    }
    const ultimosCinco = productos.slice(-5).reverse();

    const ultimoProductoCreado = productos[productos.length - 1];
   
    crearTarjeta(ultimoProductoCreado); 

    if (contenedorRecientes) {
    
    contenedorRecientes.innerHTML = ''; 
    
    ultimosCinco.forEach(producto => {
    const htmlProducto = nuevoProducto(producto);
    contenedorRecientes.insertAdjacentHTML('beforeend', htmlProducto);
    });
    }
}


form.addEventListener("submit", (formEvent) => {
    formEvent.preventDefault();

    const isModoGuardar = btnSubmit.textContent.trim() === "Guardar Producto";
    
    const file = inputImagen.files[0];
    const reader = new FileReader();
    
    reader.onload = function (event) {
    
    // Base64 de la imagen, generado para la previsualización temporal
    const imagenBase64 = event.target.result;
    imagenPreview.src = imagenBase64;
    
    // Objeto completo (usado SOLO para la previsualización)
    const productoCompleto = {
    id: inputId.value,
    nombre: inputNombre.value,
    descripcion: inputDescripcion.value,
    categoria: inputCategoria.value,
    imagen: imagenBase64, // Incluimos la data pesada aquí
    stock: inputStock.value,
    precio: inputPrecio.value,
    infoAdicional: inputInfo.value
    };

    if (isModoGuardar) {
    
    productStorage.validar();
    let productos = productStorage.obtener() || []; 
    
    const productoParaGuardar = { ...productoCompleto };
    //delete productoParaGuardar.imagen; 
    productos.push(productoParaGuardar); // Guardamos el objeto ligero
    productStorage.actualizar(productos);
    // ----------------------------------------------------
    
    console.log("Productos guardados:", productos);

    mostrarUltimosProductos(productos); 

    form.reset();
    imagenPreview.src = "";
    btnSubmit.textContent = "Previsualizar";
    alert("🎉 Producto Creado Exitosamente");

    } else {
    // Caso Previsualizar (usa el objeto completo con Base64)
    const contenedorNuevoProducto = document.getElementById("containerNuevoProducto");
    // Usamos productoCompleto, que sí tiene la imagen, para la previsualización
    contenedorNuevoProducto.innerHTML = crearTarjeta(productoCompleto); 
    btnSubmit.textContent = "Guardar Producto";
    console.log("Modo previsualización activado.");
    }
    };

    if (file) {
    reader.readAsDataURL(file);
    } else {
    alert("Por favor, selecciona una imagen para el producto.");
    }
});

// --- EJECUCIÓN INICIAL ---
(function inicializarProductos() {
    const productosExistentes = productStorage.obtener();
    if (productosExistentes && productosExistentes.length > 0) {
    const ultimoProductoGuardado = productosExistentes[productosExistentes.length - 1];
    
    crearTarjeta(ultimoProductoGuardado); 
    mostrarUltimosProductos(productosExistentes);
    }
})();