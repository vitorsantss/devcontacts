import express from 'express';
const routes = express.Router();
import AuthController from '../controllers/authController.js';

routes.post('/auth/login', AuthController.login);

export default routes;
