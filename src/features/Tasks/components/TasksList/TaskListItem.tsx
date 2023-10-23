import { formatDate } from "common/utils/formatDate";
import { ITask, TaskStatus } from "features/Tasks/interfaces/Tasks.interface";
import { taskStatusTranslate } from "features/Tasks/utils/tasks.const";
import { isTaskDone } from "features/Tasks/utils/tasks.utils";
import React from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import TaskStatusTag from "../TaskStatusTag/TaskStatusTag";

export interface ITaskItemHandlers {
  editTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<any>;
  deleteTask: (taskId: string) => void;
}

interface IProps extends ITaskItemHandlers {
  task: ITask;
}

const TaskListItem: React.FC<IProps> = ({
  task,
  editTask,
  updateTaskStatus,
  deleteTask,
}) => {
  return (
    <ListGroup.Item data-testid="tasks-list-item-test-id">
      <div className="d-flex justify-content-between">
        <div>
          <strong>
            <small>{formatDate(new Date(task.createdAt))}</small>
            <TaskStatusTag status={task.status} />
          </strong>
          <div>{task.description}</div>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              size="sm"
              variant="outline-secondary"
              id="dropdown-basic"
            >
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => editTask(task._id)}>
                Edytuj
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  updateTaskStatus(
                    task._id,
                    isTaskDone(task) ? TaskStatus.UNDONE : TaskStatus.DONE
                  )
                }
              >
                Oznacz jako{" "}
                {isTaskDone(task)
                  ? taskStatusTranslate[TaskStatus.UNDONE]
                  : taskStatusTranslate[TaskStatus.DONE]}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => deleteTask(task._id)}>
                Usuń
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default TaskListItem;
