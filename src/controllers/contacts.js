import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {
    createContact, getAllContacts, getContactById,
    deleteContact, updateContact,  } from '../services/contacts.js';

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.json({
        status: 201,
        message: 'Successfully created contact!',
        data: contact,
    });
};
export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};
export const getContactsByIdController = async (req, res, next) => {
    const id = req.params.contactId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createHttpError(400, `Invalid contact ID: ${id}`));
        return;
    }
    const contact = await getContactById(id);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contact,
    });
};
export const deleteContactController = async (req, res, next) => {
    const id = req.params.contactId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createHttpError(400, `Invalid contact ID: ${id}`));
        return;
    }
    const contact = await deleteContact(id);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};
export const patchContactController = async (req, res, next) => {
    const id = req.params.contactId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createHttpError(400, `Invalid contact ID: ${id}`));
        return;
    }
    const result = await updateContact(id, req.body);

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
};
export const putContactController = async (req, res, next) => {
    const id = req.params.contactId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createHttpError(400, `Invalid contact ID: ${id}`));
        return;
    }
    const result = await updateContact(id, req.body, { upsert: true });
    const status = result.isNew ? 201 : 200;

    res.json({
        status: status,
        message: 'Successfully upserted a contact!',
        data: result.contact,
    });
};
