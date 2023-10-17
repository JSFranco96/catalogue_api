import express from 'express';
import { ProductsRouter } from './routes/products.route';
import cors from 'cors'

class App {

    #port: number;
    #app: any

    constructor(port: number) {
        this.#port = port;
    }

    start() {
        try {
            this.#createExpressApp()
            this.#initializeRoutes()
            this.#listenPort()
        } catch (error) {
            console.log('❌ Ocurrió un error intentando correr el servidor.', error);
            process.exit(1);
        }
    }

    #createExpressApp() {
        this.#app = express()
        this.#app.use(cors())
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: false }));
    }

    #listenPort() {
        this.#app.listen(this.#port, () => {
            console.log(`¡Servidor escuchando a través del puerto ${this.#port}! 🚀`)
        });
    }

    #initializeRoutes() {

        const productsRouter = new ProductsRouter()
        this.#app.use('/api/v1/products', productsRouter.router)

    }
}

export { App };