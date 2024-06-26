import { Request, Response } from 'express';
import { CreateCourseDto } from './dtos/CreateCourse.dto';
import CourseService from './course-service';

class CourseController {
  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  deleteCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.courseService.deleteCourse(id);
      res.status(200).json({ message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }

  getMyCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.user === undefined) {
        res.status(500).json({ message: 'No user found.' });
        return;
      }
      const courses = await this.courseService.getMyCourses((req as any).user.id);
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }

  getCourseById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const course = await this.courseService.getCourseById(id);
      res.status(200).json(course);
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }

  createCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const createCourseDto: CreateCourseDto = req.body;
      const course = await this.courseService.createCourse(createCourseDto);
      res.status(200).json(course);
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }

  getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await this.courseService.getCourses();
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }
}

export default CourseController;
