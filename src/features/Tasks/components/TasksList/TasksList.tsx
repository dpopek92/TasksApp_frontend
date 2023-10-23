import { ITask } from "features/Tasks/interfaces/Tasks.interface";
import React from "react";
import { ListGroup } from "react-bootstrap";
import TaskListItem, { ITaskItemHandlers } from "./TaskListItem";

interface IProps extends ITaskItemHandlers {
  tasks?: ITask[];
}

const TasksList: React.FC<IProps> = ({ tasks, ...props }) => {
  return (
    <ListGroup data-testid="tasks-list-test-id">
      {tasks?.map((task) => (
        <TaskListItem task={task} key={task._id} {...props} />
      ))}
    </ListGroup>
  );
};

export default TasksList;
