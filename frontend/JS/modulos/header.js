const headerHTML =`
        <nav class="navbar navbar-expand-lg navbar-light pt-4 shadow-sm navbar-fixed">
            <div class="container-xxl d-flex justify-content-between align-items-center">

                <!-- Mostrar solo movil -->
                <div class="navMovil d-flex justify-content-between flex-shrink-1-">
                    <!-- Logo -->
                    <a class="navbar-brand d-flex align-items-center " href="#">
                        <img id="logo" src="../../IMG/Logo.png" alt="Logo">
                    </a>

                <!-- Botón hamburguesa -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                    aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
           </div>

            <!-- Links y buscador -->
            <div class="collapse navbar-collapse" id="mainNav">
                <!-- Links centrados -->
                <ul class="navbar-nav mx-auto gap-3 mb-2 mb-lg-0 text-center">
                    <li class="nav-item"><a class="nav-link link-custom" href="../index.html">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link link-custom" href="./catalogo.html">Catalogo</a></li>
                    <li class="nav-item"><a class="nav-link link-custom" href="./historias.html">Historias</a></li>
                    <li class="nav-item"><a class="nav-link link-custom" href="./nosotros.html">Nosotros</a></li>
                    <li class="nav-item"><a class="nav-link link-custom" href="./contacto.html">Contacto</a></li>
                </ul>

                <!-- Mi cuenta y carrito -->
                <div class="searchAccountSection d-flex gap-3 align-items-top">
                     <!-- Buscador -->
                    <form class="d-flex m-0 h-75 align-content-center" role="search">
                        <input class="form-control inputBuscar" type="search" placeholder="Buscar..." aria-label="Buscar">
                        <button class="btn search-btn" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <div class="icon text-center" id="controlSesion" style="cursor: pointer" title="Iniciar sesión">
                            <i class="fas fa-user icon-circle icon-user" id="iconoSesion"></i>
                        </a>
                        <div class="icon-text" id="usuLogueado" style="color: #F5EBDC"></div>
                    </div>
                    <div class="icon text-center" id="abrirCarrito" style="cursor: pointer">
                        <i class="fas fa-shopping-cart position-relative icon-circle icon-cart">
                            <span
                                id="cartCount"
                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            </span>
                        </i>
                    </div>
                </div>
            </div>

            </div>
        </nav>
        <!-- Carrito -->
        <div id="sidebar" class="sidebar card  bg-dark text-light vh-100">
            <div class="card-header d-flex gap-3 p-3 justify-content-between align-items-center" style="background-color:#4E342E; color: #FAF8F3" >
                <p class="fs-3 mb-0">Tu Carrito</p>
                <button id="closeCarrito" class="btn btn-outline-light border-0 fs-4">✖</button>
            </div>

            <div class="card-body overflow-y-auto">
                <div id="cart-items"></div>
            </div>

            <div class="card-footer d-flex justify-content-between align-items-center pt-2 rounded-top"
                style="background-color:#4E342E; color:#FAF8F3;">

                 <div class="flex-grow-1">
                    <h4 class="d-flex justify-content-between mb-1">
                        <span>Total Items:</span>
                        <span id="totalItemCount">0</span>
                    </h4>

                    <h4 class="d-flex justify-content-between fw-bold mb-0">
                        <span>Total Compra:</span>
                        <span>$ <span id="cart-total-check">0</span></span>
                    </h4>
                </div>

                <div class="flex-shrink-0 ms-3">
                    <button type="button" id="finalizarCompra"
                        class="btn btn-outline-light d-flex align-items-center gap-2"
                        style="max-width: 150px;">
                        Comprar
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path>
                            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
`

// como index tiene un html independiente, entonces en necesario hacer el if para que en esa página no lo busque
export const mostrarHeader = () => {
    const header = document.querySelector(".header");

    if (!header) {
        return;
    }

    header.innerHTML = headerHTML;
};
