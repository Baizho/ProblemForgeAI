import { User } from '../../auth/types/response';

export interface Course {
  id: string;
  name: string;
  photo: string;
  descr: string;
  text: string;
  video: string;
  isPrivate: boolean;
  users: User[];
}