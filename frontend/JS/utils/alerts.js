// Wrapper para SweetAlert2 (asumiendo que Swal está disponible globalmente o via import si se usa bundler en futuro)
// Si Swal no está definido, se debería agregar el script en el HTML o importarlo aquí.

const COLORES = {
    primary: '#4e73df',
    success: '#1B5E20', // Color verde oscuro usado en tu proyecto
    danger: '#e74a3b',
    warning: '#f6c23e',
    background: '#F5EBDC' // Color de fondo crema usado en tu proyecto
};

export const UI = {
    /**
     * Muestra notificación toast temporal
     */
    toast: (mensaje, icon = 'success') => {
        if (typeof Swal === 'undefined') { console.warn('SweetAlert2 no cargado'); return; }
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
        Toast.fire({ icon, title: mensaje });
    },

    /**
     * Muestra modal de éxito
     */
    modalExito: (titulo, mensaje) => {
        if (typeof Swal === 'undefined') { alert(mensaje); return Promise.resolve(); }
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'success',
            confirmButtonColor: COLORES.success,
            background: COLORES.background
        });
    },

    /**
     * Muestra modal de error
     */
    modalError: (mensaje, titulo = 'Error') => {
        if (typeof Swal === 'undefined') { alert(mensaje); return Promise.resolve(); }
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'error',
            confirmButtonColor: COLORES.success, // Usar verde para consistencia con tu UI actual
            background: COLORES.background
        });
    },

    /**
     * Modal de confirmación (Si/No)
     */
    confirmar: async (titulo, mensaje, textoConfirmar = 'Sí', textoCancelar = 'Cancelar') => {
        if (typeof Swal === 'undefined') return confirm(mensaje);

        const result = await Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: COLORES.success,
            cancelButtonColor: '#d33',
            confirmButtonText: textoConfirmar,
            cancelButtonText: textoCancelar,
            background: COLORES.background
        });
        return result.isConfirmed;
    }
};
