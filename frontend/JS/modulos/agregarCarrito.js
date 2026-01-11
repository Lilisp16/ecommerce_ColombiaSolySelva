
const URL_JSON = "../../JS/modulos/json.json";
import { cartItemCarrito } from "../../JS/modulos/cartItem.js";
import { formatearMiles } from "../../JS/main.js";


export let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log("Info del carrito: "+carrito);

function guardarCarrito(){
   localStorage.setItem("carrito",JSON.stringify(carrito));
}

export function actualizarBadgeCarrito() {
    const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);;
    const cartCount = document.getElementById("cartCount");
    const totalItems = document.getElementById("totalItemCount")
    if (cartCount) cartCount.textContent = cantidad;
    if (totalItems) totalItems.textContent =  cantidad > 1 ? `${cantidad}  Und's` : `${cantidad} Un.` 
}

export const mostrarCarrito = () => {
  const contenedor = document.getElementById("cart-items");
  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  carrito.forEach((item) => {
    contenedor.innerHTML += cartItemCarrito(item);
  });

   contenedor.querySelectorAll(".btn-incrementar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const producto = carrito.find(p => p.id === id);
      if (producto) {
        producto.cantidad = (producto.cantidad || 1) + 1;
        guardarCarrito();
        actualizarBadgeCarrito();
        mostrarCarrito();
      }
    });
  });

    contenedor.querySelectorAll(".btn-decrementar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const producto = carrito.find(p => p.id === id);
      if (producto) {
        if(producto.cantidad>1){
          producto.cantidad--
        }else{
          eliminarDelCarrito(id);
        }
        
        guardarCarrito();
        actualizarBadgeCarrito();
        mostrarCarrito(); // volver a renderizar
      }
    });
  });

  const totalCarrito = document.getElementById("cart-total-check");
  if(totalCarrito){
    totalCarrito.textContent=formatearMiles(valorTotalCarrito());
  }

  contenedor.querySelectorAll(".btn-eliminarItem").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    eliminarDelCarrito(id);
    mostrarCarrito(); // volver a renderizar
  });
});

};

let productosLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
console.log("PRODUCTOS DEL LOCALSTORAGE:", productosLocalStorage);
productosLocalStorage = productosLocalStorage.map(p => ({
    ...p,
    id: Number(p.id),
    precio: Number(p.precio),
    stock: Number(p.stock)
}));

console.log("PRODUCTOS NORMALIZADOS:", productosLocalStorage);

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
    
export const valorTotalCarrito = () => {
  const total = carrito.reduce((total,item)=>{
    return total+(Number(item.precio)* Number(item.cantidad));
  },0);
  return total;
};




