const footerHTML = `

<footer class="text-white" style="background-color: #4E342E;">
  <div class="container-fluid py-4 colorLetra">

    <div class="row mb-3">
      <!-- Logo, título y lema -->
      <div class="col-md-3 d-flex flex-column align-items-start mb-3 mb-md-0">
        <div class="d-flex align-items-center mb-2">
          <img src="../../IMG/logo.png" alt="Logo" class="me-2" style="height:50px;">
          <span class="fs-4 fw-bold text-success" style="font-family: 'Caveat', cursive;">Colombia Sol y Selva</span>
        </div>
        <p class="mb-0 small">Conectamos Colombia con el mundo, a través de artesanías que cuentan historias</p>
      </div>

      <!-- Productos -->
      <div class="col-md-3 mb-3 mb-md-0">
        <h6 class="fw-bold">Productos</h6>
        <ul class="list-unstyled small ">
          <li><a href="categoria-moda.html" class="colorLetra text-decoration-none link-hover">Moda y Accesorios</a></li>
          <li><a href="categoria-decoracion.html" class="colorLetra text-decoration-none link-hover">Decoración para el hogar</a></li>
          <li><a href="categoria-arte.html" class="colorLetra text-decoration-none link-hover">Arte y Recuerdos</a></li>
          <li><a href="categoria-utensilios.html" class="colorLetra text-decoration-none link-hover">Utensilios y Productos Funcionales</a></li>
        </ul>
      </div>

      <!-- Acerca de -->
      <div class="col-md-3 mb-3 mb-md-0">
        <h6 class="fw-bold">Acerca de</h6>
        <ul class="list-unstyled small">
          <li><a href="pagina-equipo.html#equipo" class="colorLetra text-decoration-none link-hover">Equipo de Desarrollo</a></li>
          <li><a href="historias-artesanos.html" class="colorLetra text-decoration-none link-hover">Historias de los Artesanos</a></li>
          <li><a href="pagina-equipo.html#mision" class="colorLetra text-decoration-none link-hover">Misión, Visión y Valores</a></li>
        </ul>
      </div>

      <!-- Soporte -->
      <div class="col-md-3 mb-3 mb-md-0">
        <h6 class="fw-bold">Soporte</h6>
        <ul class="list-unstyled small">
          <li><a href="Terminos_Condiciones.html" class="colorLetra text-decoration-none link-hover">Términos y Condiciones de Garantías</a></li>
          <li><a href="formularioContactenos.html" class="colorLetra text-decoration-none link-hover">Contacto</a></li>
          <li><a href="preguntasFrecuentes.html" class="colorLetra text-decoration-none link-hover">Preguntas Frecuentes</a></li>
          <li><a href="vistaAdministrador.html" class="colorLetra text-decoration-none link-hover">Administrador</a></li>
          </ul>
      </div>
    </div>

    <hr class="border-light">

    <!-- copy -->
    <div class="row align-items-center">
      <div class="col-md-6">
        <p class="mb-0 small">&copy; 2025 Colombia Sol y Selva. Todos los derechos reservados.</p>
      </div>
      <div class="col-md-6 text-md-end">
        <a href="https://www.linkedin.com" target="_blank" class="text-white me-3 link-hover fs-5">
          <i class="bi bi-linkedin"></i>
        </a>
        <a href="https://github.com" target="_blank" class="text-white link-hover fs-5">
          <i class="bi bi-github"></i>
        </a>
      </div>
    </div>

  </div>

 

`




export const mostrarFooter = () => {
  const footer = document.querySelector(".footer-artesanal");
  if (!footer) return;
  footer.innerHTML = footerHTML;

  // Alguns estilos
  if (!document.getElementById("footer-styles")) {
    const style = document.createElement("style");
    style.id = "footer-styles";
    style.textContent = `
      .colorLetra { color: #FAF8F3 !important; }
      .link-hover:hover { color: #D4AF37 !important; text-decoration: underline; }
    `;
    document.head.appendChild(style);
  }
};