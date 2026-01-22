import { api } from './apiClient.js';
import { StorageService } from '../utils/storage.js';
import { getPath } from '../utils/navigation.js';

export const AuthService = {
    /**
     * Inicia sesión llamando al backend
     * @param {string} correo 
     * @param {string} password 
     */
    async login(correo, password) {
        try {
            // endpoint: /cliente/loginConDTO espera { correoCliente, contrasenaCliente }
            // IMPORTANTE: El backend responderá 401 si las credenciales fallan.
            // ApiClient está configurado para no tratar esto como 'Sesión Expirada' en rutas 'login'.
            const payload = {
                correoCliente: correo,
                contrasenaCliente: password
            };

            const token = await api.post('/cliente/loginConDTO', payload);

            if (token) {
                StorageService.set(StorageService.KEYS.TOKEN, token);

                // Fallback de usuario mientras se carga el real
                const usuarioData = {
                    nombreCliente: correo.split("@")[0],
                    correoCliente: correo
                };
                StorageService.set(StorageService.KEYS.USER, usuarioData);

                return token;
            } else {
                throw new Error("Respuesta vacía del servidor");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    /**
     * Registra un nuevo cliente
     * @param {object} datosCliente 
     */
    async register(datosCliente) {
        try {
            // Endpoint asumido según convención (ajustar si es diferente en backend Spring Boot)
            const res = await api.post('/cliente/crear', datosCliente);
            return res;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error;
        }
    },

    /**
     * Obtiene datos completos del usuario desde backend
     */
    async fetchUsuarioActual() {
        const token = StorageService.getToken();
        if (!token) return null;

        try {
            const usuario = await api.get('/cliente/me');
            if (usuario) {
                StorageService.set(StorageService.KEYS.USER, usuario);
            }
            return usuario;
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
            return null;
        }
    },

    /**
     * Cierra la sesión localmente
     */
    logout() {
        StorageService.clearSession();
        window.location.href = getPath("login.html");
    },

    /**
     * Verifica si hay sesión activa (token existe)
     */
    isAuthenticated() {
        return !!StorageService.getToken();
    }
};
