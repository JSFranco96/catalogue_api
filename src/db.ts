import mongoose from 'mongoose';

class Database {

    #uri: string

    constructor(uri: string) {
        this.#uri = uri
    }

    connect() {
        mongoose.connect(this.#uri).then(
            () => {
                console.log('¡Conectado a MongoDB exitosamente! 🎉');
            }
        ).catch(
            (err) => {
                console.log(`❌ Ocurrió un error estableciendo la conexión con la base de datos: ${err}`)
                process.exit(1);
            }
        )
    }
}

export { Database }