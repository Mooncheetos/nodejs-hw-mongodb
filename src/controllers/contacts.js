import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      return next(createHttpError(400, 'Invalid contact id!'));
    }

    const contact = await getContactById(contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found!'));
    }

    res.status(200).json({
      status: 200,
      data: contact,
      message: `Successfully found contact with id ${contactId}!`,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      return next(createHttpError(400, 'Invalid contact id!'));
    }

    const result = await updateContact(contactId, body);

    if (!result) {
      return next(createHttpError(404, 'Contact not found!'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      return next(createHttpError(400, 'Invalid contact id!'));
    }

    const contact = await deleteContact(contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found!'));
    }

    res.status(204).send();
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const putContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      return next(createHttpError(400, 'Invalid contact id!'));
    }

    const result = await updateContact(contactId, req.body, { upsert: true });

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
      status: status,
      message: 'Successfully upserted a contact!',
      data: result.contact,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};
