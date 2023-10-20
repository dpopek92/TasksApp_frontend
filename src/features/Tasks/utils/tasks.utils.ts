import { ITask, TaskStatus } from "../interfaces/Tasks.interface";

export const isTaskDone = (task: ITask) => task.status === TaskStatus.DONE;
