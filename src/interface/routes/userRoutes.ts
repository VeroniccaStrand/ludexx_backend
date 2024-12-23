import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = Router();
const userController = new UserController();

// Wrappa kontrollermetoder med felhantering
router.post('/user', (req, res, next) => userController.create(req, res, next));

export { router as userRoutes };
