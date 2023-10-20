import authorizedApi from "api/interceptor";
import { AxiosResponse } from "axios";
import { ISearchParams, ISearchResult } from "interfaces/Search.interface";
import { ITask } from "../interfaces/Tasks.interface";

export interface ITaskData extends Pick<ITask, "description"> {}
export interface IUpdateTask
  extends Partial<Pick<ITask, "description" | "status">> {}

export interface ISearchTasks extends ISearchParams {
  description?: string;
}

export const tasksApi = {
  createTask: async (newTaskData: ITaskData): Promise<AxiosResponse<ITask>> => {
    return authorizedApi.post(`/api/tasks`, newTaskData);
  },
  getTasks: async (
    searchQuery: ISearchTasks
  ): Promise<AxiosResponse<ISearchResult<ITask>>> => {
    return authorizedApi.get(`/api/tasks`, { params: searchQuery });
  },
  getTask: async (taskId?: string): Promise<AxiosResponse<ITask>> => {
    if (!taskId) throw new Error(`Wrong taskId param: ${taskId}`);
    return authorizedApi.get(`/api/tasks/${taskId}`);
  },
  updateTask: async (
    taskId: string | undefined,
    updateData: IUpdateTask
  ): Promise<AxiosResponse<ITask>> => {
    if (!taskId) throw new Error(`Wrong taskId param: ${taskId}`);
    return authorizedApi.put(`/api/tasks/${taskId}`, updateData);
  },
  updateTaskField: async (
    taskId: string | undefined,
    updateData: IUpdateTask
  ): Promise<AxiosResponse<ITask>> => {
    if (!taskId) throw new Error(`Wrong taskId param: ${taskId}`);
    return authorizedApi.patch(`/api/tasks/${taskId}`, updateData);
  },
  deleteTask: async (
    taskId: string | undefined
  ): Promise<AxiosResponse<ITask>> => {
    if (!taskId) throw new Error(`Wrong taskId param: ${taskId}`);
    return authorizedApi.delete(`/api/tasks/${taskId}`);
  },
};
