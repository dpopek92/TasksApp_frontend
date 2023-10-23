import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { formatDate } from "common/utils/formatDate";
import { renderWithStyledComponents } from "common/utils/_test/renderWithStyledComponentsProvider";
import { ITask, TaskStatus } from "features/Tasks/interfaces/Tasks.interface";
import TaskListItem from "../TasksList/TaskListItem";

describe("TaskListItem", () => {
  const date = new Date();
  const tasks: ITask = {
    _id: "123",
    user: "123",
    description: "description",
    createdAt: date,
    updatedAt: date,
    status: TaskStatus.DONE,
  };
  const editTask = (taskId: string) => {};
  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    return new Promise(() => {});
  };
  const deleteTask = (taskId: string) => {};
  const testId = "tasks-list-item-test-id";

  it("should render", () => {
    expect(
      renderWithStyledComponents(
        <TaskListItem
          task={tasks}
          editTask={editTask}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
      )
    ).toBeTruthy();
  });

  it("should be in HTML", () => {
    renderWithStyledComponents(
      <TaskListItem
        task={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByTestId(testId);
    expect(result).toBeInTheDocument();
  });

  it("should be visible", () => {
    renderWithStyledComponents(
      <TaskListItem
        task={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByTestId(testId);
    expect(result).toBeVisible();
  });

  it("should have menu button", () => {
    renderWithStyledComponents(
      <TaskListItem
        task={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByText("Menu");
    expect(result).toBeInTheDocument();
  });

  it("should have text content", () => {
    renderWithStyledComponents(
      <TaskListItem
        task={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByText("description");
    expect(result).toBeInTheDocument();
  });

  it("should have date", () => {
    renderWithStyledComponents(
      <TaskListItem
        task={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByText(formatDate(date));
    expect(result).toBeInTheDocument();
  });

  it("should have tag with status", () => {
    renderWithStyledComponents(
      <TaskListItem
        task={tasks}
        editTask={editTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    );

    const result = screen.getByText("Ukończone");
    expect(result).toBeInTheDocument();
  });
});
