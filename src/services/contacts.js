import { Contact } from '../db/models/contacts';

export const getAllContacts = async () => {
    return await Contact.find();
};

export const getContactById = async (id) => { 
    return await Contact.findById(id);
};