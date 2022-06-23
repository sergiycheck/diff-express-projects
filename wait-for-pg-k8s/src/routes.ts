import express from 'express';
import todoRouter from './todo/todo.route';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'default' });
});

router.get('/health', (_req, res) => {
  res.json({ message: 'up and working! yes!' });
});

router.use('/todo', todoRouter);

export default router;
