import { Router } from 'express';
import { adminMiddleware } from '../middlewares/admin-middleware';
import adminController from './admin-controller';

const adminRouter = Router();

adminRouter.post('/user/role', adminMiddleware, adminController.changeUserRole);
adminRouter.get('/user/all', adminMiddleware, adminController.getAllUsers);
adminRouter.get('/admin/check', adminMiddleware, adminController.check);

export default adminRouter;
