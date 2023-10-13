import { Connect } from './db';
import { App } from './app';
import { config } from 'dotenv';
import path from 'path';

const env = `.env.${process.env.NODE_ENV}`;

const envPath = path.resolve(__dirname, '..', env)

config({ path: envPath });

let port: number = 3000;
if (process.env.PORT) {
    port = +process.env.PORT;
}

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/catalogue'

new Connect(mongoURI);

new App(port);