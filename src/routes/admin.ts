import { Router } from 'express';
import adminController from '~/controllers/admin.controller';

const router = Router();

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

router.post('/delete-product/:prodId', adminController.deleteProduct);

export default router;
