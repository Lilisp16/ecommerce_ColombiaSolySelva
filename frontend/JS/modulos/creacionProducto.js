import { crearTarjetaPrevisualizacion } from "./crearTarjeta.js";
import { productosRecientes } from "./cartItem.js";
window.addEventListener("beforeunload", () => {
  console.log("🚨 RECARGA DETECTADA");
});
const API_URL = "http://localhost:8080/producto/crear-producto";

// ---------------- ELEMENTOS ----------------


const inputNombre = document.getElementById("nombre");
const inputDescripcion = document.getElementById("descripcion");
const inputCategoria = document.getElementById("categoria");
const inputImagen = document.getElementById("imagen");
const inputStock = document.getElementById("stock");
const inputPrecio = document.getElementById("precio");
const inputInfo = document.getElementById("infoAdicional");

const imagenPreview = document.getElementById("preview");
const btnPrevisualizar = document.getElementById("btnPrevisualizar");
const btnGuardar = document.getElementById("btnGuardar");

const contenedorPrevisualizacion = document.getElementById("containerNuevoProducto");
const contenedorRecientes = document.getElementById("contenedorAgregadosRecientemente");

// ---------------- ESTADO ----------------
let productoPrevisualizado = null;
let formDataProducto = null;

// ---------------- BACK ----------------
async function enviarProductoBackend(formData) {
    const response = await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    if (!response.ok) throw new Error("Error al guardar");
    return response.json();
}

// ---------------- PREVISUALIZAR ----------------
btnPrevisualizar.addEventListener("click", () => {
    const file = inputImagen.files[0];
    if (!file) {
        Swal.fire("Imagen requerida", "Selecciona una imagen", "warning");
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        productoPrevisualizado = {
            nombre: inputNombre.value,
            descripcion: inputDescripcion.value,
            categoria: inputCategoria.value,
            imagen: e.target.result,
            stock: inputStock.value,
            precio: inputPrecio.value,
            infoAdicional: inputInfo.value
        };

        // 👇 SOLO SE RENDERIZA AQUÍ
        contenedorPrevisualizacion.innerHTML =
            crearTarjetaPrevisualizacion(productoPrevisualizado);

        imagenPreview.src = productoPrevisualizado.imagen;
        imagenPreview.classList.remove("d-none");

        formDataProducto = new FormData();
        formDataProducto.append("nombre", inputNombre.value);
        formDataProducto.append("descripcion", inputDescripcion.value);
        formDataProducto.append("categoria", inputCategoria.value);
        formDataProducto.append("precio", inputPrecio.value);
        formDataProducto.append("stock", inputStock.value);
        formDataProducto.append("imagen", file);

        btnGuardar.classList.remove("d-none");
    };

    reader.readAsDataURL(file);
});

// ---------------- GUARDAR ----------------
btnGuardar.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    
    if (!formDataProducto) return;

    try {
        const guardado = await enviarProductoBackend(formDataProducto);

        Swal.fire("Guardado", "Producto registrado correctamente", "success");

        // ✅ agregar a recientes
        contenedorRecientes.insertAdjacentHTML(
            "afterbegin",
            productosRecientes({
                nombre: guardado.nombreProducto,
                precio: guardado.precioProducto,
                stock: guardado.stockProducto,
                imagen: guardado.imagenProducto
            })
        );

        // ✅ LIMPIAMOS SOLO TEXTOS
        inputNombre.value = "";
        inputDescripcion.value = "";
        inputCategoria.selectedIndex = 0;
        inputStock.value = "";
        inputPrecio.value = "";
        inputInfo.value = "";

        btnGuardar.classList.add("d-none");
        formDataProducto = null;

    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
});