import { Request, Response } from 'express';
import UserModel, { IUser } from './models/User';

class UserController {
  async getMentors(req: Request, res: Response) {
    try {
      res.status(200).json(await UserModel.find({ role: 'mentor' }).exec());
    } catch(err: any) {
      console.error('Not found', err);
      res.status(500).json({ message: 'Not found' });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      res.status(200).json(await UserModel.find({ _id: userId }).exec());
    } catch(err: any) {
      console.error('Not found', err);
      res.status(500).json({ message: 'Not found' });
    }
  }

  async updateSettings(req: Request, res: Response): Promise<void> {
    const { email, password, name, surname, image, descr, calendly_link } = req.body;

    try {
      const updatedFields: Partial<IUser> = {};
      
      if (email) updatedFields.email = email;
      if (password) updatedFields.password = password;
      if (name) updatedFields.name = name;
      if (surname) updatedFields.surname = surname;
      if (image) updatedFields.image = image;
      if (descr) updatedFields.descr = descr;
      if (calendly_link) updatedFields.calendly_link = calendly_link;
  
      const userId = (req as any).user?.id;
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true }).exec();

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user settings:', error);
      res.status(500).json({ message: 'Error updating user settings' });
    }
  }
}

export default UserController;
