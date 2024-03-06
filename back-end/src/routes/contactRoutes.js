import express from 'express';

import ContactController from '../controllers/contactController.js';
import ValidateContact from '../middlewares/validateContact.js';
import authenticated from '../middlewares/authenticated.js';

const routes = express.Router();

routes.use(authenticated);

routes.get('/contacts', ContactController.listContacts);
routes.get('/contacts/:id', ContactController.listContact);
routes.get('/contact', ContactController.searchContact);
routes.post('/contacts', ValidateContact.createContact, ContactController.createContact);
routes.put('/contacts/:id', ValidateContact.alterContact, ContactController.updateContact);
routes.delete('/contacts/:id', ContactController.deleteContact);

export default routes;