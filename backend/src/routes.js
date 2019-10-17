import { Router } from 'express';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/students/:adm', StudentController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.put('/students/:adm/:id', StudentController.update);

export default routes;
