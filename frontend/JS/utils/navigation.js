/**
 * Resuelve la ruta relativa para páginas HTML
 * Considera si se está en la raíz o en /pages/
 * @param {string} pagina - Nombre del archivo html destino (ej: 'login.html')
 */
export function getPath(pagina) {
    const path = window.location.pathname;

    // Si ya estamos dentro de /pages/, el enlace es directo
    if (path.includes("/pages/")) {
        return pagina;
    }

    // Si estamos en raíz (index.html), entramos a pages/
    return `pages/${pagina}`;
}

/**
 * Resuelve la ruta relativa para imágenes
 * @param {string} rutaImg 
 */
export function getPathImgs(rutaImg) {
    const limpia = rutaImg.replace("../", "");
    const path = window.location.pathname;

    if (path.includes("/pages/")) {
        return `../${limpia}`;
    }

    return limpia;
}
