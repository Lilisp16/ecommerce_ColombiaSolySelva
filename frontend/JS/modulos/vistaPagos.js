import { obtenerUsuarioActual } from "./auth.js";
import { carrito, valorTotalCarrito } from "./agregarCarrito.js";
import { formatearMiles } from "../main.js";


const listaProductos = document.getElementById("listaProductos");
const subtotalPago = document.getElementById("subtotalPago");
const totalPago = document.getElementById("totalPago");
const btnConfirmar = document.getElementById("btnConfirmarPago");

export const initVistaPagos = async () => {
    const usuario = await obtenerUsuarioActual();

    if (!usuario) {
        Swal.fire({
            icon: "warning",
            title: "Sesión expirada",
            text: "Por favor, inicia sesión nuevamente para continuar.",
            confirmButtonColor: "#1B5E20"
        }).then(() => {
            window.location.href = "login.html";
        });
        return;
    }

    // Llenar datos de envío
    document.getElementById("nombreCliente").value = `${usuario.nombreCliente} ${usuario.apellidoCliente}`;
    document.getElementById("correoCliente").value = usuario.correoCliente;
    document.getElementById("direccionCliente").value = usuario.direccionCliente;
    document.getElementById("ciudadCliente").value = usuario.ciudadCliente;
    document.getElementById("telefonoCliente1").value = usuario.telCliente;

    // Renderizar resumen de compra
    renderResumen();

    btnConfirmar.addEventListener("click", () => {
        confirmarCompra(usuario);
    });
};

function renderResumen() {
    if (!listaProductos) return;
    listaProductos.innerHTML = "";

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
      <div>
        <span>${item.nombre}</span>
        <small class="text-muted d-block">Cantidad: ${item.cantidad}</small>
      </div>
      <strong>$${formatearMiles(item.precio * item.cantidad)}</strong>
    `;
        listaProductos.appendChild(li);
    });

    const subtotal = valorTotalCarrito();
    const envio = 5000;
    const total = subtotal + envio;

    subtotalPago.textContent = `$${formatearMiles(subtotal)}`;
    totalPago.textContent = `$${formatearMiles(total)}`;
}

async function confirmarCompra(usuario) {
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked')?.value;

    if (!metodoPago) {
        Swal.fire({
            icon: "warning",
            title: "Método de pago",
            text: "Por favor, selecciona un método de pago.",
            confirmButtonColor: "#1B5E20"
        });
        return;
    }

    const pedido = {
        id: "COLSS" + Date.now(),
        fecha: new Date().toLocaleDateString(),
        idCliente: usuario.idCliente,
        cliente: usuario.nombreCliente + " " + usuario.apellidoCliente,
        items: carrito,
        total: valorTotalCarrito() + 5000,
        metodoPago: metodoPago,
        direccionEnvio: document.getElementById("direccionCliente").value,
        ciudadEnvio: document.getElementById("ciudadCliente").value
    };

    // Aquí se llamaría al backend para guardar el pedido si existiera el endpoint
    // Por ahora simularemos el éxito y limpiaremos el carrito

    Swal.fire({
        title: "¡Muchas gracias por tu compra!",
        icon: "success",
        text: `Tu pedido #${pedido.id} ha sido registrado con éxito. Medio de pago: ${metodoPago}`,
        confirmButtonText: "Ir a mis pedidos",
        confirmButtonColor: "#1B5E20"
    }).then(() => {
        localStorage.removeItem("carrito");
        window.location.href = "vistaUsuario.html";
    });
}

// Inicializar si estamos en la página de pagos
if (window.location.pathname.includes("vistaPagos.html")) {
    initVistaPagos();
}
