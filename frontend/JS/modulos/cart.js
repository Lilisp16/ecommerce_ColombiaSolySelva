export class Carrito {
    constructor(abrirCarrito) {
        this.abrirCarrito = abrirCarrito,
        this.cartCount = 1
    }
    mostrarCantidadItems(cantidad) {
        const badge = document.getElementById("cartCount");
        const totalItemCount = document.getElementById("totalItemCount");
        badge.textContent = cantidad;
        totalItemCount.textContent = cantidad;
        this.cartCount = cantidad;
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

        this.mostrarCantidadItems(10)
    }
    añadirProductos {
        //localstoras
        /* 
        Recibir un eventdo desde catalogo
        */
    }

}