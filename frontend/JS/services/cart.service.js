import { StorageService } from '../utils/storage.js';

export const CartService = {
    /**
     * Obtiene el carrito actual
     * @returns {Array} Listado de items
     */
    getCart() {
        return StorageService.get(StorageService.KEYS.CART) || [];
    },

    /**
     * Guarda el estado del carrito
     * @param {Array} cart 
     */
    saveCart(cart) {
        StorageService.set(StorageService.KEYS.CART, cart);
    },

    /**
     * Agrega un producto al carrito
     * @param {object} product 
     */
    addItem(product) {
        const cart = this.getCart();
        // Asegurar tipos
        const pId = Number(product.id);
        const existing = cart.find(item => Number(item.id) === pId);

        if (existing) {
            existing.cantidad++;
        } else {
            cart.push({ ...product, id: pId, cantidad: 1 });
        }
        this.saveCart(cart);
        return cart;
    },

    /**
     * Actualiza la cantidad (incrementa o decrementa)
     * @param {number} id 
     * @param {number} delta (+1 o -1)
     */
    updateQuantity(id, delta) {
        let cart = this.getCart();
        const item = cart.find(i => Number(i.id) === Number(id));

        if (item) {
            item.cantidad += delta;
            // Si baja de 1, eliminar
            if (item.cantidad <= 0) {
                return this.removeItem(id);
            }
            this.saveCart(cart);
        }
        return cart;
    },

    /**
     * Elimina un item por ID
     * @param {number} id 
     */
    removeItem(id) {
        let cart = this.getCart();
        cart = cart.filter(item => Number(item.id) !== Number(id));
        this.saveCart(cart);
        return cart;
    },

    /**
     * Vacía el carrito
     */
    clear() {
        StorageService.remove(StorageService.KEYS.CART);
    },

    /**
     * Calcula total de items
     */
    getTotalItems() {
        const cart = this.getCart();
        return cart.reduce((acc, item) => acc + item.cantidad, 0);
    },

    /**
     * Calcula valor total monetario
     */
    getTotalValue() {
        const cart = this.getCart();
        return cart.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)), 0);
    }
};
