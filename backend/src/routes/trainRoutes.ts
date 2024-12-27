import { Router } from 'express';
import { bookSeats, getSeats, resetSeats } from '../controllers/trainControllers';
import { authenticate } from '../middlewares/authMiddlewares';

const router: Router = Router();

router.get('/seats', authenticate, getSeats);
router.post('/book', authenticate, bookSeats);
router.post('/reset', authenticate, resetSeats);

export default router;