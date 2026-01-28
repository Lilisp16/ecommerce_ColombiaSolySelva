import { crearTarjetaPrevisualizacion } from "./crearTarjeta.js";
import { productosRecientes } from "./cartItem.js";

// ---------------- CONFIG ----------------
const API_URL = "http://localhost:8080/producto/crear-producto";

// ---------------- ELEMENTOS ----------------
const form = document.getElementById("creacionProducto");

const inputNombre = form.querySelector("#nombre");
const inputDescripcion = form.querySelector("#descripcion");
const inputCategoria = form.querySelector("#categoria");
const inputImagen = form.querySelector("#imagen");
const inputStock = form.querySelector("#stock");
const inputPrecio = form.querySelector("#precio");
const inputInfo = form.querySelector("#infoAdicional");

const imagenPreview = form.querySelector("#preview");
const btnSubmit = form.querySelector("button[type='submit']");

const contenedorPrevisualizacion = document.getElementById("containerNuevoProducto");
const contenedorRecientes = document.getElementById("contenedorAgregadosRecientemente");

// ---------------- PREVISUALIZACIÓN ----------------
function previsualizarProducto(producto) {
    if (!contenedorPrevisualizacion) return;
    contenedorPrevisualizacion.innerHTML = crearTarjetaPrevisualizacion(producto);
}

// ---------------- ENVIAR AL BACKEND ----------------
async function enviarProductoBackend(formData) {
    const response = await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}

// ---------------- EVENTO SUBMIT ----------------
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = inputImagen.files[0];

    if (!file) {
        Swal.fire("Imagen requerida", "Debes seleccionar una imagen", "warning");
        return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {

        // BASE64 SOLO PARA PREVISUALIZACIÓN
        const imagenBase64 = event.target.result;

        // PREVIEW
        const productoPreview = {
            nombre: inputNombre.value,
            descripcion: inputDescripcion.value,
            categoria: inputCategoria.value,
            imagen: imagenBase64,
            stock: inputStock.value,
            precio: inputPrecio.value,
            infoAdicional: inputInfo.value
        };

        imagenPreview.src = imagenBase64;
        previsualizarProducto(productoPreview);

        // FORM DATA REAL PARA BACKEND
        const formData = new FormData();
        formData.append("nombre", inputNombre.value);
        formData.append("descripcion", inputDescripcion.value);
        formData.append("categoria", inputCategoria.value);
        formData.append("precio", inputPrecio.value);
        formData.append("stock", inputStock.value);
        formData.append("imagen", file);
try {
    const guardado = await enviarProductoBackend(formData);

    // 🔁 Normalizamos el objeto del backend al formato del frontend
    const productoNormalizado = {
        id: guardado.idProducto,
        nombre: guardado.nombreProducto,
        precio: guardado.precioProducto,
        descripcion: guardado.descripcionProducto,
        categoria: guardado.categoriaProducto,
        stock: guardado.stockProducto,
        imagen: guardado.imagenProducto
    };

    Swal.fire({
        title: "Producto guardado",
        text: "Producto registrado correctamente",
        icon: "success"
    });

    // Mostrar producto recién creado
    if (contenedorRecientes) {
        contenedorRecientes.insertAdjacentHTML(
            "afterbegin",
            productosRecientes(productoNormalizado)
        );
    }

    form.reset();
    imagenPreview.src = "";
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo guardar el producto", "error");
        }
    };

    reader.readAsDataURL(file);
});
