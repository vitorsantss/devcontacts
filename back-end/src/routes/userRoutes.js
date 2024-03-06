import express from 'express';

import UserController from '../controllers/userController.js';
import ValidateUser from '../middlewares/validateUser.js';
import authenticated from '../middlewares/authenticated.js';

const routes = express.Router();

routes.post('/users', ValidateUser.createUser, UserController.createUser);

routes.use(authenticated);

routes.get('/users', UserController.listUsers);
routes.get('/users/:id', UserController.listUser);
routes.put('/users/:id', ValidateUser.alterUser, UserController.updateUser);
routes.delete('/users/:id', UserController.deleteUser);

export default routes;