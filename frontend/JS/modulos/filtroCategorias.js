export function crearFiltroCategoria(productos, renderizarPagina){
    const contenedorFiltros = document.getElementById("filtroCategorias");

    const categorias =["Todos", ...new Set(productos.map(p=>p.categoria))];

    contenedorFiltros.innerHTML = categorias.map(cat=>`
        <button class="btn-primary btnFiltro" data-cat="${cat}"> ${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>`).join("");
    
    const botones=contenedorFiltros.querySelectorAll(".btnFiltro");

    botones.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const cat = btn.dataset.cat;

            const productosFiltros=
            cat==="Todos"? productos: productos.filter(p=>p.categoria === cat);

            renderizarPagina(productosFiltros);

            botones.forEach(b=>b.classList.remove("activo"));
            btn.classList.add("activo")
        })
    })
}