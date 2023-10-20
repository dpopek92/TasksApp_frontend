import Navigation from "components/Navigation/Navigation";
import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const TasksPage = lazy(
  () => import("../features/Tasks/Pages/TasksPage/TasksPage")
);
const NewTaskPage = lazy(
  () => import("../features/Tasks/Pages/NewTaskPage/NewTaskPage")
);
const EditTaskPage = lazy(
  () => import("../features/Tasks/Pages/EditTaskPage/EditTaskPage")
);

export const PrivateRoutes = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/new-task" element={<NewTaskPage />} />
        <Route path="/:taskId/edit" element={<EditTaskPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
