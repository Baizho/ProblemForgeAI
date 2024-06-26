import { CreateCourseDto } from './dtos/CreateCourse.dto';
import CourseModel, { ICourse } from './models/Course';

class CourseService {

  async deleteCourse(id: string) {
    return await CourseModel.findByIdAndDelete(id).exec();
  }

  async getMyCourses(userId: string) {
    return await CourseModel.find({ users: userId }).populate('users', '-password').exec();
  }

  async getCourseById(id: string) {
    return await CourseModel.find({ _id: id }).populate('users', '-password').exec();
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<ICourse> {
    const { name, photo, text, video, isPrivate, descr} = createCourseDto;

    const newCourse = new CourseModel({
      name,
      photo,
      text,
      video,
      isPrivate,
      descr
    });

    await newCourse.save();
    return newCourse;
  }

  async getCourses(): Promise<ICourse[]> {
    return await CourseModel.find().populate('users', '-password').exec();
  }
}

export default CourseService;
