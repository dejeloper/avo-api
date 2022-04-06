import { Router } from 'express'
import * as productsController from '../../controllers/v1/products.controllers'
import { authJwt } from "../../middlewares/v1";

const router = Router()

router.post('/', [authJwt.verifyToken], productsController.createProduct);
router.get('/', [authJwt.verifyToken], productsController.getProducts);
router.get('/:productId', [authJwt.verifyToken], productsController.getProductById);
router.put('/:productId', [authJwt.verifyToken], productsController.updateProductById);
router.delete('/:productId', [authJwt.verifyToken], productsController.deleteProductById);

export default router;
