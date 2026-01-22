/**
 * Formatea un número a formato de miles (localización Colombia)
 * @param {number} numero 
 * @returns {string}
 */
export function formatearMiles(numero) {
    if (!numero && numero !== 0) return '';
    return numero.toLocaleString('es-CO');
}
