import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/envVars.js';
import { errorHandler } from './middlewares/errorHandlers.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = env(ENV_VARS.PORT, 3000);

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }));
    app.use(cookieParser());
    app.use(router);
    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use(errorHandler);
    app.use('*', notFoundHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
