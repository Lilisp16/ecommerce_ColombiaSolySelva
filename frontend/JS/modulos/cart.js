import { cartItemCarrito } from "./cartItem.js";
import { obtenerCantidadTotal } from "./agregarCarrito.js";
import { carrito } from "./agregarCarrito.js";

export class Carrito {
    constructor(abrirCarrito) {
        this.abrirCarrito = abrirCarrito,
        this.cartCount = 0
    }

    mostrarCantidadItems() {
        const cantidad = obtenerCantidadTotal();
        document.getElementById("cartCount").textContent = cantidad;
        document.getElementById("totalItemCount").textContent = cantidad;
    }

    inicializar() {
        const botonCarrito = document.getElementById(this.abrirCarrito);
        botonCarrito.addEventListener("click" , () => {
            
            const sidebarCarrito = document.getElementById("sidebar");
            const closeCarrito = document.getElementById("closeCarrito");
            console.log(sidebarCarrito);
            

            sidebarCarrito.classList.add("open");

            closeCarrito.addEventListener("click", () => {
                console.log("cerrar");
                
                sidebarCarrito.classList.remove("open");
            });                                 
        })

        this.mostrarCantidadItems();
    }
}
 
