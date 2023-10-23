import { IUser } from "features/Users/interfaces/Users.interface";

export enum TaskStatus {
  UNDONE = "UNDONE",
  DONE = "DONE",
}

export interface ITask {
  _id: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  status: TaskStatus;
}
