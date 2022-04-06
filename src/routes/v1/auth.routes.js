import { Router } from 'express'
import * as authController from '../../controllers/v1/auth.controllers'

const router = Router()

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

export default router;