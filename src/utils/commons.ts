
export class Commons {
    constructor() { }

    ObjectsPropertyValidator(initialObjetc: any, compareObject: any): boolean {
        try {

            let error: boolean = false

            for (const key in initialObjetc) {
                // Validamos si las propiedades en "compareObjet" existen en "initialObjetc"
                if (!Object.prototype.hasOwnProperty.call(compareObject, key)) {
                    error = true
                    break
                }
                // Validamos que sea el mismo tipo de dato:
                if (typeof compareObject[key] !== typeof initialObjetc[key]) {
                    error = true
                    break
                }
            }

            return error
        } catch (error) {
            console.log('❌ Ocurrió un error validando las propiedades de los objetos >> ', error)
            return false;
        }
    }
}