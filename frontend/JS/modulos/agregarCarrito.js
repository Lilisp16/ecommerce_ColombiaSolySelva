
const URL_JSON = "../../JS/modulos/json.json";
import { cartItemCarrito } from "../../JS/modulos/cartItem.js";


export let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log("Info del carrito: "+carrito);

function guardarCarrito(){
   localStorage.setItem("carrito",JSON.stringify(carrito));
}

export function actualizarBadgeCarrito() {
    const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);;
    const cartCount = document.getElementById("cartCount");
    if (cartCount) cartCount.textContent = cantidad
}

export const mostrarCarrito = () => {
  const contenedor = document.getElementById("cart-items");
  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  /* nombree,precio,cantidad,imagen */
  carrito.forEach((item) => {
    /* contenedor.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div class="d-flex align-items-center gap-2">
          <img 
            src="${item.imagen}" 
            style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"
          >
          <div>
            <h6 style="color:black"><strong>${item.nombre}</strong></h6>
            <h6 style="color:black"><strong>$${item.precio}</strong></h6>
            <h6 style="color:black"><strong>${item.cantidad}</strong></h6>
          </div>
        </div>
      </div>
    `; */
    contenedor.innerHTML += cartItemCarrito(item);
  });
};


    

    let productosLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
    console.log("PRODUCTOS DEL LOCALSTORAGE:", productosLocalStorage);


    export const agregarAlCarrito = (producto) => {
    console.log("Producto recibido:", producto);
    console.log("Carrito antes:", carrito);

    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarBadgeCarrito();
    mostrarCarrito()
 

    Swal.fire({
        title: "Producto agregado",
        text: `${producto.nombre} fue agregado al carrito`,
        icon: "success",
        timer: 2500,
        showConfirmButton: true,
    });
    console.log("Carrito después:", carrito);
    };

    export function eliminarDelCarrito(id){
        carrito = carrito.filter((item) => item.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        guardarCarrito();
        actualizarBadgeCarrito();
        mostrarCarrito();
  
    };


    export const obtenerCantidadTotal = () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        return carrito.reduce((total, item) => total + item.cantidad, 0);
    };

    window.addEventListener("load", () => {
    mostrarCarrito();
    actualizarBadgeCarrito();
    });
    


