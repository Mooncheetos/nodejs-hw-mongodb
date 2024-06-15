import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import {
    createContactController, getContactByIdController, getContactsController,
    deleteContactController, putContactController, patchContactController,
} from '../controllers/contacts.js';

const router = Router();
router.post('/contacts', ctrlWrapper(createContactController));
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(putContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default router;
