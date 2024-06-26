import { Request, Response } from 'express';
import adminService from './admin-service';

class AdminController {
  async check(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ result: "Ok" });
    } catch (error) {
      console.error('Failed to login admin:', error);
      res.status(500).json({ message: 'Failed to login admin' });
    }
  }

  async changeUserRole(req: Request, res: Response): Promise<void> {
    const { id, role } = req.body;

    try {
      const updatedUser = await adminService.changeUserRole(id, role);

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Failed to update user role:', error);
      res.status(500).json({ message: 'Failed to update user role' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }
}

export default new AdminController();
