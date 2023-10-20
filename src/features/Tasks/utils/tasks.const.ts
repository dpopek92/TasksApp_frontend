import { TaskStatus } from "../interfaces/Tasks.interface";

export const taskStatusTranslate = {
  [TaskStatus.DONE]: "ukończone",
  [TaskStatus.UNDONE]: "nieukończone",
};
