import express from 'express';
import cors from 'cors';
import pino from 'pino';
import mongoose from 'mongoose';
import { env } from './utils/env';
import { envVars } from './constants/envVars';
import { getAllContacts, getContactById } from './services/contacts';

const PORT = env(envVars.PORT, 3000);


export const setupServer = () => {
    const app = express();
    app.use(cors());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }),
    );
    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        res.json({
            status: 200,
            message: 'Success get contacts',
            data: contacts,
        });
    });
    app.get('/contacts/:contactId', async (req, res, next) => {
        try {
            const id = req.params.contactId;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid contact ID: ${id}`,
                });
            }
            const contact = await getContactById(id);
            if (!contact) {
                return res.status(404).json({
                    status: 404,
                    message: `Contact with id ${id} not found`,
                });
            }

            res.json({
                status: 200,
                message: 'Success get contact',
                data: contact,
            });
        } catch (error) {
            next(error);
        }
    });

    app.use((error, req, res, next) => {
    res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
};
