

export class Carrito {
    constructor() {
        // Elementos del DOM
        this.container = document.getElementById("cartItems");
        this.badge = document.getElementById("cartCountBadge");
        this.subtotalEl = document.getElementById("subtotal");
        this.envioEl = document.getElementById("envio");
        this.impuestosEl = document.getElementById("impuestos");
        this.totalEl = document.getElementById("totalPagar");

        // Datos
        this.items = this._cargar(); // array de {id,nombre,precio,img,cantidad,fav}
        this.envio = parseInt(this.envioEl?.textContent || 5000);
        this.impuestos = 0;

        // Inicializa UI
        this._render();
    }

    // --- LOCAL STORAGE ---
    _cargar() {
        try {
            const raw = localStorage.getItem("carrito");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Error al parsear localStorage carrito:", e);
            return [];
        }
    }

    _guardar() {
        localStorage.setItem("carrito", JSON.stringify(this.items));
    }

    // --- OPERACIONES ---
    agregar(producto) {
        // producto: {id, nombre, precio, img}
        const existente = this.items.find(i => i.id === producto.id);
        if (existente) {
            existente.cantidad += 1;
        } else {
            this.items.push({ ...producto, cantidad: 1, fav: false });
        }
        this._guardar();
        this._render();
    }

    aumentar(id) {
        const it = this.items.find(i => i.id === id);
        if (!it) return;
        it.cantidad += 1;
        this._guardar();
        this._renderItem(id);
        this._calcularTotales();
    }

    disminuir(id) {
        const it = this.items.find(i => i.id === id);
        if (!it) return;
        if (it.cantidad > 1) it.cantidad -= 1;
        else this.eliminar(id);
        this._guardar();
        this._render();
    }

    eliminar(id) {
        this.items = this.items.filter(i => i.id !== id);
        this._guardar();
        this._render();
    }

    toggleFav(id) {
        const it = this.items.find(i => i.id === id);
        if (!it) return;
        it.fav = !it.fav;
        this._guardar();
        this._renderItem(id);
    }

    vaciar() {
        this.items = [];
        this._guardar();
        this._render();
    }

    // --- RENDERIZADO ---
    _render() {
        // render todos los items
        if (!this.container) return;
        this.container.innerHTML = "";
        this.items.forEach(item => this.container.appendChild(this._crearNodoItem(item)));
        this._renderBadge();
        this._calcularTotales();
    }

    _renderItem(id) {
        // reemplaza el nodo de un item concreto
        const nodo = document.querySelector(`[data-id=\"item-${id}\"]`);
        const item = this.items.find(i => i.id === id);
        if (!item && nodo) nodo.remove();
        else if (item && nodo) {
            const nuevo = this._crearNodoItem(item);
            nodo.replaceWith(nuevo);
            this._renderBadge();
            this._calcularTotales();
        }
    }

    _renderBadge() {
        if (this.badge) {
            const totalUnidades = this.items.reduce((s, i) => s + i.cantidad, 0);
            this.badge.textContent = totalUnidades;
        }
    }

    _calcularTotales() {
        const subtotal = this.items.reduce((s, i) => s + (i.precio * i.cantidad), 0);
        this.subtotalEl && (this.subtotalEl.textContent = subtotal);
        // impuestos simples: 0% para ejemplo (puedes ajustar)
        this.impuestos = Math.round(subtotal * 0.0);
        this.impuestosEl && (this.impuestosEl.textContent = this.impuestos);
        const total = subtotal + this.envio + this.impuestos;
        this.totalEl && (this.totalEl.textContent = total);
    }

    _crearNodoItem(item) {
        // estructura DOM
        const wrapper = document.createElement("div");
        wrapper.className = "item-carrito";
        wrapper.setAttribute("data-id", `item-${item.id}`);

        // imagen
        const img = document.createElement("img");
        img.src = item.img || "https://via.placeholder.com/90";
        img.alt = item.nombre;

        // info
        const info = document.createElement("div");
        info.className = "item-info";
        info.innerHTML = `
            <h4>${item.nombre}</h4>
            <div class="text-success">${item.stock ? 'En stock' : ''}</div>
            <div class="item-price">$${item.precio}</div>
        `;

        // cantidad box
        const qty = document.createElement("div");
        qty.className = "cantidad-box";

        const btnMinus = document.createElement("button");
        btnMinus.type = "button";
        btnMinus.textContent = "-";
        btnMinus.addEventListener("click", () => this.disminuir(item.id));

        const spanQty = document.createElement("span");
        spanQty.textContent = item.cantidad;

        const btnPlus = document.createElement("button");
        btnPlus.type = "button";
        btnPlus.textContent = "+";
        btnPlus.addEventListener("click", () => this.aumentar(item.id));

        qty.appendChild(btnMinus);
        qty.appendChild(spanQty);
        qty.appendChild(btnPlus);

        // favorito
        const favBtn = document.createElement("button");
        favBtn.className = "fav-btn btn";
        favBtn.innerHTML = item.fav ? '<i class="fa fa-heart text-danger"></i>' : '<i class="fa-regular fa-heart"></i>';
        favBtn.addEventListener("click", () => this.toggleFav(item.id));

        // borrar
        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-sm btn-outline-danger ms-2";
        delBtn.innerHTML = '<i class="fa fa-trash"></i>';
        delBtn.addEventListener("click", () => this.eliminar(item.id));

        // estructura grid: imagen, info, qty, actions
        wrapper.appendChild(img);
        wrapper.appendChild(info);
        wrapper.appendChild(qty);

        const actions = document.createElement("div");
        actions.appendChild(favBtn);
        actions.appendChild(delBtn);
        wrapper.appendChild(actions);

        return wrapper;
    }
}

// --- INICIALIZACIÓN GLOBAL ---
// Export default helper para inicializar desde HTML
export default function initCarrito() {
    const carrito = new Carrito();
    // Exponer para consola y pruebas
    window.carrito = carrito;
    return carrito;
}

