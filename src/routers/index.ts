import { Router } from 'express';
import { authController, categoriesController, serviceController } from '../controllers';
import { isAuth } from '../middlewares';

const router = Router();

router.use('/auth', authController);
router.use('/categories', categoriesController);
router.use('/services', serviceController);


export { router };
