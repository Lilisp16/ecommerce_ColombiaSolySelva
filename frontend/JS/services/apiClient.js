const BASE_URL = 'http://localhost:8080';

class ApiClient {
    /**
     * Realiza una petición HTTP genérica
     * @param {string} endpoint - La ruta del endpoint (ej: '/cliente/me')
     * @param {object} options - Opciones de fetch
     */
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('jwt');
        const isFormData = options.body instanceof FormData;

        const defaultHeaders = {
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        if (!isFormData) {
            defaultHeaders['Content-Type'] = 'application/json';
        }

        const config = {
            ...options,
            headers: { ...defaultHeaders, ...options.headers }
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, config);

            // Manejo de 401 Unauthorized
            // Excluir endpoint de login
            if (response.status === 401 && !endpoint.includes("login")) {
                console.warn('Sesión expirada o token inválido');
                window.dispatchEvent(new Event('auth:unauthorized'));
                throw new Error('Sesión expirada');
            }

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(errorBody.message || `Error HTTP ${response.status}`);
            }

            if (response.status === 204) return null;

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") === -1) {
                return await response.text();
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error en ${endpoint}:`, error);
            throw error;
        }
    }

    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    post(endpoint, body) {
        const isFormData = body instanceof FormData;
        return this.request(endpoint, {
            method: 'POST',
            body: isFormData ? body : JSON.stringify(body)
        });
    }

    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

export const api = new ApiClient();
