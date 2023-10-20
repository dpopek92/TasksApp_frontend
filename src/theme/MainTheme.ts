import { TaskStatus } from "features/Tasks/interfaces/Tasks.interface";

export const theme = {
  taskStatus: {
    [TaskStatus.UNDONE]: "#fa3e54",
    [TaskStatus.DONE]: "#73a52e",
  },
};
