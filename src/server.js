import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import ContactsRouter from './routers/contacts.js';
import { env } from './utils/env.js';
import { envVars } from './constants/envVars.js';
import { errorHandler } from './middlewares/errorHandlers.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = env(envVars.PORT, 3000);

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }));
    app.use(ContactsRouter);
    app.use(errorHandler);
    app.use('*', notFoundHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
