export function crearFiltroCategoria(productos, renderizarConFiltro) {
    const contenedorFiltros = document.getElementById("filtroCategorias");
    if (!contenedorFiltros) return; // Evita errores si no existe el div

    // 🔹 Mapa de categorías con slug, nombre y imagen
    const categoriasInfo = [
        { slug: "todos", nombre: "Todos", img: "../../IMG/catTodos.jpg" },
        { slug: "moda", nombre: "Moda y Accesorios", img: "../../IMG/catModa.jpg" },
        { slug: "decoracion", nombre: "Decoración para el Hogar", img: "../../IMG/catDecoracion.jpg" },
        { slug: "arte", nombre: "Arte y Recuerdos", img: "../../IMG/catArte.jpg" },
        { slug: "utensilios", nombre: "Utensilios Funcionales", img: "../../IMG/catUtensilios.png" },
    ];

    // 🔹 Genera los botones con imagen y texto
    contenedorFiltros.innerHTML = categoriasInfo.map(cat => `
        <button class="btnFiltro" data-cat="${cat.slug}">
            <img src="${cat.img}" alt="${cat.nombre}" class="imgFiltro">
            <span>${cat.nombre}</span>
        </button>
    `).join("");

    // 🔹 Map de slugs a nombres reales de las categorías
    const slugMap = {
        todos: null,
        moda: "Moda y Accesorios",
        decoracion: "Decoración para el Hogar",
        arte: "Arte y Recuerdos",
        utensilios: "Utensilios Funcionales"
    };

    // 🔹 Selecciona todos los botones generados
    const botones = contenedorFiltros.querySelectorAll(".btnFiltro");

    // 🔹 Agrega funcionalidad al click
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const catSlug = btn.dataset.cat;
            const catNombre = slugMap[catSlug];

            if (!catNombre) {
                // Todos
                history.replaceState({}, "", "catalogo.html");
                renderizarConFiltro(productos);
            } else {
                // Filtrar productos por categoría real
                renderizarConFiltro(
                    productos.filter(p => p.categoria === catNombre)
                );
            }

            // Activar botón
            botones.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
        });
    });
}
