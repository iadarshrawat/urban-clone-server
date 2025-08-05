import { Router } from 'express';
import { authController } from '../controllers';
import { isAuth } from '../middlewares';

const router = Router();

router.use('/auth', authController);

export { router };
