import { setDocumentTitle } from "common/utils/setDocumentTitle";
import ConfirmationModal from "components/ConfirmationModal/ConfirmationModal";
import Empty from "components/Empty/Empty";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import PageHeader from "components/PageHeader/PageHeader";
import { useControledDebounce } from "hooks/useControledDebounce";
import usePagination from "hooks/usePagination";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import TasksList from "../../components/TasksList/TasksList";
import useTasks from "../../hooks/useTasks";

const TasksPage = () => {
  const { pageNumber, itemsPerPage, setTotalItems, Pagination } = usePagination(
    { pageNumber: 1, itemsPerPage: 5 }
  );
  const {
    value: description,
    debouncedValue: debouncedDescription,
    handleDebouncedValue,
  } = useControledDebounce();

  const {
    tasks,
    searchParams,
    isError,
    isLoading,
    goToEditTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks({
    pageNumber,
    itemsPerPage,
    description: debouncedDescription,
  });
  const [taskToDelete, setTaskToDelete] = useState<string | undefined>();

  useEffect(() => {
    setDocumentTitle(`Lista zadań`);
  }, []);

  useEffect(() => {
    setTotalItems(searchParams?.totalItems || 0);
  }, [searchParams?.totalItems]);

  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    handleDebouncedValue(e.target.value);
  };
  const handleDeleteTask = async () => {
    await deleteTask(taskToDelete);
    setTaskToDelete(undefined);
  };

  if (isError) return <Alert variant="danger">Coś poszło nie tak</Alert>;
  return (
    <Container fluid>
      {isLoading && <LoadingSpinner />}
      <PageHeader title="Lista zadań" />
      <Row className="justify-content-end ">
        <Col sm={12} md={3}>
          <Form.Control
            placeholder="Opis zadania"
            value={description}
            onChange={handleDescription}
          />
        </Col>
      </Row>

      <Row className="mt-3 justify-content-center ">
        <Col sm={12} md={7}>
          {!tasks?.length ? (
            <Empty />
          ) : (
            <>
              <div className="d-flex justify-content-end mb-2">
                <Pagination />
              </div>
              <TasksList
                tasks={tasks}
                deleteTask={setTaskToDelete}
                updateTaskStatus={updateTaskStatus}
                editTask={goToEditTask}
              />
            </>
          )}
        </Col>
      </Row>

      {/* NOTE MODALS */}
      {!!taskToDelete && (
        <ConfirmationModal
          closeModal={() => setTaskToDelete(undefined)}
          onConfirm={handleDeleteTask}
          confirmationModalText="Jesteś pewien że chcesz usunąć to zadanie?"
        />
      )}
    </Container>
  );
};

export default TasksPage;
