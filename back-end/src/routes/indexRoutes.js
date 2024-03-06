import express from 'express';

import auth from './authRoutes.js';
import user from './userRoutes.js';
import contacts from './contactRoutes.js';


const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).json({message: 'Welcome to the devcontacts api!'}));

    app.use(
        express.json(),
        auth,
        user,
        contacts
    );
};

export default routes;