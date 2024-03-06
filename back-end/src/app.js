import express from 'express';
import routes from './routes/indexRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import error404 from './middlewares/error404.js';
import cors from 'cors';

const app = express();
app.use(cors());
routes(app);

app.use(error404);

app.use(errorHandler);

export default app;