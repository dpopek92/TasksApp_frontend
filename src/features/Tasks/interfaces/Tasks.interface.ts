import { IUser } from "features/Users/interfaces/Users.interface";

export enum TaskStatus {
  UNDONE = "UNDONE",
  DONE = "DONE",
}

export interface ITask {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  description: string;
  status: TaskStatus;
}
