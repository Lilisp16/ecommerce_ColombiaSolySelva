import { api } from './apiClient.js';
import { StorageService } from '../utils/storage.js';

const FALLBACK_JSON = "../../JS/modulos/productos.json";

export const ProductService = {
    /**
     * Obtiene todos los productos.
     * Prioridad: API Backend -> LocalStorage Cache -> JSON Local
     */
    async getAll() {
        try {
            // Intenta obtener del backend
            const rawProducts = await api.get('/producto');

            if (rawProducts && rawProducts.length > 0) {
                // Adaptador: Backend (Java) -> Frontend (JS)
                const products = rawProducts.map(p => {
                    // Normalizar la ruta de la imagen eliminando prefijos relativos antiguos si existen
                    let rutaLimpia = (p.imagenProducto || p.imagen || "img/productos/default.png");
                    rutaLimpia = rutaLimpia.replace(/^(\.\.\/)+/, "").replace(/^\//, ""); // Elimina ../../ y / inicial

                    return {
                        id: p.idProducto,
                        nombre: p.nombreProducto,
                        precio: p.precioProducto,
                        descripcion: p.descripcionProducto,
                        categoria: p.categoriaProducto,
                        stock: p.stockProducto,
                        imagen: rutaLimpia, // Guardamos solo la parte "IMG/..."
                        ...p
                    };
                });

                // Actualizar caché
                StorageService.set(StorageService.KEYS.PRODUCTS, products);
                return products;
            }
        } catch (error) {
            console.warn("Backend no disponible. Usando caché local.", error);
        }

        // Fallback: Cache
        let products = StorageService.get(StorageService.KEYS.PRODUCTS);

        if (!products || products.length === 0) {
            console.log("Caché vacía. Cargando JSON semilla...");
            try {
                const res = await fetch(FALLBACK_JSON);
                products = await res.json();
                StorageService.set(StorageService.KEYS.PRODUCTS, products);
            } catch (jsonError) {
                console.error("Error crítico: No se pudieron cargar productos.", jsonError);
                return [];
            }
        }

        return products;
    },

    /**
     * Guarda un nuevo producto
     * @param {object} product 
     */
    async create(product) {
        // ... (existing logic for JSON product creation)
        try {
            const savedProduct = await api.post('/producto/crear', product);
            const current = this.getCached();
            current.push(savedProduct || product);
            StorageService.set(StorageService.KEYS.PRODUCTS, current);
            return savedProduct;
        } catch (error) {
            console.warn("Backend error, saving locally", error);
            // Fallback logic...
            const current = this.getCached();
            if (!product.id) product.id = Date.now();
            current.push(product);
            StorageService.set(StorageService.KEYS.PRODUCTS, current);
            return product;
        }
    },

    /**
     * Crea un producto enviando FormData (para imagen + datos)
     * Endpoint: backend/producto/crear
     */
    async createWithImage(formData) {
        try {
            // api.post ahora soporta FormData sin stringify
            // Se asume que backend retorna el objeto creado
            const savedProductRaw = await api.post('/producto/crear', formData);

            // Adaptar respuesta si es necesario (camelCase vs snake_case)
            // Asumimos que backend devuelve el objeto JSON estándar

            // Normalizar a nuestro modelo frontend (nombre, precio, etc)
            // Esto es similar al map en getAll()
            const p = savedProductRaw;
            let rutaLimpia = (p.imagenProducto || p.imagen || "img/productos/default.png");
            rutaLimpia = rutaLimpia.replace(/^(\.\.\/)+/, "").replace(/^\//, "");

            const newProduct = {
                id: p.idProducto || p.id || Date.now(),
                nombre: p.nombreProducto || formData.get("nombre"),
                precio: p.precioProducto || formData.get("precio"),
                descripcion: p.descripcionProducto || formData.get("descripcion"),
                categoria: p.categoriaProducto || formData.get("categoria"),
                stock: p.stockProducto || formData.get("stock"),
                imagen: rutaLimpia,
            };

            const current = this.getCached();
            current.push(newProduct);
            StorageService.set(StorageService.KEYS.PRODUCTS, current);

            return newProduct;
        } catch (error) {
            console.error("Error creando producto con imagen:", error);
            throw error;
        }
    },

    /**
     * Obtiene sincrónicamente del caché (para filtros rápidos UI)
     */
    getCached() {
        return StorageService.get(StorageService.KEYS.PRODUCTS) || [];
    }
};
