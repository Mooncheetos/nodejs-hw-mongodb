import { Contact } from '../db/models/contacts.js';
import createHttpError from 'http-errors';
import { SORT_ORDER } from '../constants/envVars.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  contactsQuery.where('userId').equals(userId);

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .exec(),
  ]);

  if (contactsCount === 0) {
    throw createHttpError(404, 'Contact not found for the given params!');
  }

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const createContact = async (payload, userId) => {
  const contactData = {
    ...payload,
    userId,
  };
  return await Contact.create(contactData);
};

export const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, userId });
};

export const deleteContact = async (id, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: id,
    userId,
  });
  return contact;
};

export const updateContact = async (id, payload, userId, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    {
      _id: id,
      userId,
     },
    payload,
    { new: true, includeResultMetadata: true, ...options }
  );

  if (!rawResult) {
    throw createHttpError(404, 'Contact not found');
  }

  return {
    contact: rawResult,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};
