import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ITask, TaskStatus } from "features/Tasks/interfaces/Tasks.interface";
import TasksList from "../TasksList/TasksList";

describe("TaskList", () => {
  const tasks: ITask[] = [];
  const editTask = (taskId: string) => {};
  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    return new Promise(() => {});
  };
  const deleteTask = (taskId: string) => {};
  const testId = "tasks-list-test-id";

  it("should render", () => {
    expect(
      render(
        <TasksList
          tasks={tasks}
          editTask={editTask}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
      )
    ).toBeTruthy();
  });

  it("should should be in HTML", () => {
    render(
      <TasksList
        tasks={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByTestId(testId);
    expect(result).toBeInTheDocument();
  });

  it("should should be visible", () => {
    render(
      <TasksList
        tasks={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByTestId(testId);
    expect(result).toBeVisible();
  });
});
