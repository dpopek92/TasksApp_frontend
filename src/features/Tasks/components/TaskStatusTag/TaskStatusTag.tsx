import { TaskStatus } from "features/Tasks/interfaces/Tasks.interface";
import { taskStatusTranslate } from "features/Tasks/utils/tasks.const";
import React from "react";
import styled from "styled-components";
import { upperFirst } from "lodash";

const Span = styled.div<{ status: TaskStatus }>`
  max-width: fit-content;
  display: inline;
  margin: 1px 2px;
  padding: 1px 3px;
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme, status }) => {
    return theme.taskStatus[status];
  }};
  border: 1px solid
    ${({ theme, status }) => {
      return theme.taskStatus[status] + 90;
    }};
  border-radius: 3px;
  background-color: ${({ theme, status }) => {
    return theme.taskStatus[status] + 30;
  }};
`;

interface IProps {
  status: TaskStatus;
}

const TaskStatusTag: React.FC<IProps> = ({ status }) => {
  return <Span status={status}>{upperFirst(taskStatusTranslate[status])}</Span>;
};

export default TaskStatusTag;
