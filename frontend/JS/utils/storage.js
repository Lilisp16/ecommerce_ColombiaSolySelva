// Constantes para las llaves de localStorage para evitar strings mágicos
const KEYS = {
    TOKEN: 'jwt',
    USER: 'usuario',
    CART: 'carrito',
    PRODUCTS: 'productos'
};

export const StorageService = {
    KEYS,

    /**
     * Obtiene un item parseado desde localStorage
     * @param {string} key 
     * @returns {any} El valor parseado o null
     */
    get(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;
        try {
            return JSON.parse(item);
        } catch (e) {
            // Si no es JSON válido (ej: token string puro), devolver como string
            return item;
        }
    },

    /**
     * Guarda un item en localStorage, stringificando si es objeto
     * @param {string} key 
     * @param {any} value 
     */
    set(key, value) {
        const val = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(key, val);
    },

    /**
     * Elimina un item
     * @param {string} key 
     */
    remove(key) {
        localStorage.removeItem(key);
    },

    /**
     * Limpia toda la sesión (token y usuario)
     */
    clearSession() {
        this.remove(KEYS.TOKEN);
        this.remove(KEYS.USER);
    },

    // Helpers específicos
    getToken() { return this.get(KEYS.TOKEN); },
    getUser() { return this.get(KEYS.USER); }
};
