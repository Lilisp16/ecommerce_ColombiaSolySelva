
const URL_JSON = "../../JS/modulos/json.json";

// Contenedores del catálogo
const recomendadosBox = document.getElementById("recomendados");
const nuevosBox = document.getElementById("nuevos");
const ultimosBox = document.getElementById("ultimos");

// tarjeta visual
function crearTarjeta(producto) {
    return `
        <div class="col-md-3">
            <div class="producto-card shadow-sm">
                <img src="${producto.imagen}" class="w-100" alt="${producto.nombre}">
                <div class="p-3">
                    <h5 class="fw-semibold">${producto.nombre}</h5>
                    <p class="text-muted small">${producto.descripcion}</p>
                    <p class="text-secondary small"><strong>Categoría:</strong> ${producto.categoria}</p>
                    <p class="fw-bold">$${producto.precio.toLocaleString()}</p>
                    <button class="btn green-btn w-100">Agregar</button>
                </div>
            </div>
        </div>
    `;
}

// Cargar JSON
fetch(URL_JSON)
    .then(res => res.json())
    .then(productos => {

        // tarjetas → Recomendados
        recomendadosBox.innerHTML = productos.slice(0, 3)
            .map(crearTarjeta).join("");

        // tarjetas → Nuevos
        nuevosBox.innerHTML = productos.slice(3, 7)
            .map(crearTarjeta).join("");

        //  tarjetas → Últimas unidades
        ultimosBox.innerHTML = productos.slice(7, 11)
            .map(crearTarjeta).join("");
    })
    .catch(err => console.error("Error al cargar JSON:", err));