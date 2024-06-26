import UserModel, {IUser} from '../auth/models/User';

class AdminService {
  async changeUserRole(userId: string, role: string): Promise<IUser | null> {
    try {
      return await UserModel.findByIdAndUpdate(userId, {role}, {new: true}).exec();
    } catch (error) {
      console.error('Failed to update user role:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      return await UserModel.find().exec();
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }
}

export default new AdminService();
