import mongoose from 'mongoose';

class Connect {
    constructor(uri: string) {
        mongoose.connect(uri).then(
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

export { Connect }