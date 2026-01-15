export class LocalStorage {
    constructor(keyName, defaultValue = null) {
        this.keyName = keyName;
        this.defaultValue = defaultValue; 
    }
    obtener() {
        const item = localStorage.getItem(this.keyName);
        if (item === null) {
            return null;
        }
        // Intentar parsear el JSON si parece un objeto/array, si no, devolver el string
        try {
            return JSON.parse(item);
        } catch (error) {
            return item;
        }
    }

    crear(value) {
        let valueToStore = value;

        if (typeof value === 'object' && value !== null) {
            valueToStore = JSON.stringify(value);
        }
        console.log(this.keyName);
        console.log(valueToStore);
        
        
        localStorage.setItem(this.keyName, valueToStore);
        console.log(`✅ Ítem '${this.keyName}' creado/actualizado.`);
    }

    actualizar(newValue) {
        console.log(`🔄 Actualizando ítem '${this.keyName}'...`);
        this.crear(newValue);
    }
    eliminar() {
        localStorage.removeItem(this.keyName);
        console.log(`❌ Ítem '${this.keyName}' eliminado.`);
    }
    
    validar() {
        const item = localStorage.getItem(this.keyName);

        if (item === null) {
            console.log(`⚠️ Ítem '${this.keyName}' no existe.`);
            
            // Si tenemos un valor por defecto, lo creamos
            if (this.defaultValue !== null) {
                console.log(`✨ Creando ítem con valor por defecto...`);
                this.crear(this.defaultValue);
                return true;
            } else {
                console.log(`❌ No hay valor por defecto, no se creó.`);
                return false;
            }
        } else {
            console.log(`🟢 Ítem '${this.keyName}' ya existe.`);
            return true;
        }
    }
}