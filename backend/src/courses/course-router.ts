import { Router } from 'express';
import CourseController from './course-controller';
import CourseService from './course-service';
import {authMiddleware} from "../middlewares/auth-middleware";

const courseRouter = Router();

const courseService = new CourseService();
const courseController = new CourseController(courseService);

courseRouter.post('/create', courseController.createCourse);
courseRouter.get('/', courseController.getCourses);
courseRouter.get('/my', authMiddleware, courseController.getMyCourses);
courseRouter.get('/:id', courseController.getCourseById);
courseRouter.get("/delete/:id", authMiddleware, courseController.deleteCourse);

export default courseRouter;
