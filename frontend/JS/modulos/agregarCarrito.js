import { getPath } from "../../JS/main.js";

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

function crearPedidoDesdeCarrito(){
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) return null;

  const pedido = {
    id: "COLSS"+Date.now(),
    fecha: new Date().toDateString(),
    cliente: localStorage.getItem("logueado"),
    items: carrito,
    totalItems: obtenerCantidadTotal(),
    totalPedido: valorTotalCarrito()
  }

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);

  localStorage.setItem("pedidos",JSON.stringify(pedidos));

  localStorage.removeItem("carrito")

  return(pedido)

}



//Acciones del botón Comprar del carrito
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#finalizarCompra");
  if (!btn) return;

  const usuActivo = localStorage.getItem("logueado");

  if (!usuActivo) {
    Swal.fire({
      title: "Iniciar Sesión",
      text: "Para procesar tu compra es necesario iniciar sesión, por favor ingresa o regístrate. Una vez registrado, regresa al carrito para finalizar tu compra",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Registrarse",
      cancelButtonText: "Iniciar Sesión",
      confirmButtonColor: "#1B5E20",
      cancelButtonColor: "#1B5E20"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = getPath("registro.html");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = getPath("login.html");
      }
    });
  } else {
      const pedido = crearPedidoDesdeCarrito();
      if(!pedido){
        Swal.fire({
        title: "No hay productos en tu carrito",
        text: "Tu carrito está vacío, por favor agrega productos para procesar tu compra",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "Volver al Catalogo",
        confirmButtonColor: "#1B5E20"
        }).then((result) => {
          if (result.isConfirmed) {
          window.location.href = getPath("catalogo.html");
          }
        })
      } else {
        Swal.fire({
        title: "Gracias por tu compra",
        icon: "success",
        text: `Estamos procesando tu pedido No. ${pedido.id}, puedes hacer seguimiento a tu compra ingresando a tu perfil.`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Consultar pedidos",
        cancelButtonText: "Volver al Catalogo",
        confirmButtonColor: "#1B5E20",
        cancelButtonColor: "#1B5E20"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = getPath("vistaUsuario.html");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = getPath("catalogo.html");
      }
    });
  }
  }
});