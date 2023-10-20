import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ISearchTasks, IUpdateTask, tasksApi } from "../api/tasks.api";
import { TaskStatus } from "../interfaces/Tasks.interface";

const useTasks = (searchQuery: ISearchTasks) => {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isTasksLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-tasks", searchQuery],
    queryFn: () => tasksApi.getTasks(searchQuery),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: deleteTask, isPending: isRemoving } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: (taskId: string | undefined) => {
      return tasksApi.deleteTask(taskId);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const { mutateAsync: updateStatus, isPending: isUpdating } = useMutation({
    mutationKey: ["update-task-status"],
    mutationFn: ({
      taskId,
      updateData,
    }: {
      taskId: string | undefined;
      updateData: IUpdateTask;
    }) => {
      return tasksApi.updateTaskField(taskId, updateData);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const tasks = data?.data.content;
  const searchParams = data?.data.searchParams;
  const isLoading = isTasksLoading || isRemoving;
  const refetchTasks = refetch;
  const goToEditTask = (taskId: string) => navigate(`${taskId}/edit`);
  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    return updateStatus({ taskId, updateData: { status } });
  };

  return {
    tasks,
    searchParams,
    refetchTasks,
    updateTaskStatus,
    deleteTask,
    goToEditTask,
    isLoading,
    isError,
  };
};

export default useTasks;
