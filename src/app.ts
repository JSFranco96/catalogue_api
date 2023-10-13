import express from 'express';

class App {
    constructor(port: number) {
        try {
            const app = express()
            app.use(express.json)
            app.listen(port, () => {
                console.log(`¡Servidor escuchando en el puerto ${port}! 🚀`)
            });

        } catch (error) {
            console.log('❌ Ocurrió un error intentando correr el servidor.');
            process.exit(1);
        }
    }
}

export { App };