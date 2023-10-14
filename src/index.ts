import { Database } from './db';
import { App } from './app';
import { config } from 'dotenv';
import path from 'path';
import { DEFAULTS } from './utils/constants';

class Server {

    #env: string
    #port: number
    #mongoURI: string

    constructor() {
        this.#env = path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`)
        this.#environmentConfig()
        this.#port = process.env.PORT ? +process.env.PORT : DEFAULTS.PORT
        this.#mongoURI = process.env.MONGO_URI || DEFAULTS.MONGO_URI
    }

    startServer() {
        this.#connectToDatabase()
        this.#startApp()
    }

    #environmentConfig() {
        config({ path: this.#env })
    }

    #connectToDatabase() {
        const database = new Database(this.#mongoURI);
        database.connect();
    }

    #startApp() {
        const app = new App(this.#port);
        app.start();
    }
}

const server = new Server()
server.startServer()
