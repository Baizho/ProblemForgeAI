import { Router } from 'express';
import UserController from './user-controller';
import {authMiddleware} from "../middlewares/auth-middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/user/update', authMiddleware, userController.updateSettings);
userRouter.get("/user/mentors", userController.getMentors);
userRouter.get("/user/:id", userController.getUserById);
export default userRouter;
