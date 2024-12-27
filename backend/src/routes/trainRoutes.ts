import { Router } from 'express';
import { bookSeats, getSeats, resetSeats } from '../controllers/trainControllers';
import { authenticate } from '../middlewares/authMiddlewares';

const router: Router = Router();

router.get('/seats', getSeats);
router.post('/book', bookSeats);
router.post('/reset', resetSeats);

export default router;