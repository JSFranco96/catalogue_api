import express from 'express';
import { ProductsRouter } from './routes/products.route';
import { TagsRouter } from './routes/tags.route';

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
        this.#app.use(express.json)
    }

    #listenPort() {
        this.#app.listen(this.#port, () => {
            console.log(`¡Servidor escuchando a través del puerto ${this.#port}! 🚀`)
        });
    }

    #initializeRoutes() {
        const productsRouter = new ProductsRouter()
        this.#app.use('/products', productsRouter.router)

        const tagsRouter = new TagsRouter()
        this.#app.use('/tags', tagsRouter.router)
    }
}

export { App };