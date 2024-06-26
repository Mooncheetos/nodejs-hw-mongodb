import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import {
  createContactController,
  getContactByIdController,
  getContactsController,
  deleteContactController,
  putContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const router = Router();

router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.use('/contacts/:contactId', validateMongoId('contactId'));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));
// router.put('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(putContactController));

export default router;
