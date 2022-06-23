import express from 'express';
import todoController from './todo.controller';
const router = express.Router();

router.get('/', todoController.getTodo);

export default router;
