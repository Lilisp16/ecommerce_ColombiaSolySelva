export const buscadorHeader = () => {
    console.log("Buscando header");
    
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.inputBuscar');

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault(); // evita enviar el form al hacer clic en la lupa
        searchInput.classList.toggle('show');
        if (searchInput.classList.contains('show')) {
        searchInput.focus();
        }
    });
}