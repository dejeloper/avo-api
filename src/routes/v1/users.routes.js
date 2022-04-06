import { Router } from 'express'
import * as usersController from "../../controllers/v1/users.controller";
import { authJwt } from "../../middlewares/v1";

const router = Router()

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

export default router;