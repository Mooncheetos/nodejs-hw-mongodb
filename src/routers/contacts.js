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
import { authenticate } from '../middlewares/authenticate.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const router = Router();

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.use('/:contactId', validateMongoId('contactId'));
router.use(authenticate);
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.put(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(putContactController),
);
export default router;
