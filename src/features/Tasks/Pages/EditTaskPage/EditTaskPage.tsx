import { useMutation, useQuery } from "@tanstack/react-query";
import { setDocumentTitle } from "common/utils/setDocumentTitle";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import PageHeader from "components/PageHeader/PageHeader";
import { IUpdateTask, tasksApi } from "features/Tasks/api/tasks.api";
import TaskForm from "features/Tasks/components/TaskForm/TaskForm";
import React, { useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

const EditTaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentTitle(`Edycja zadania`);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-task", taskId],
    queryFn: () => tasksApi.getTask(taskId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: handleUpdateTask, isPending } = useMutation({
    mutationKey: ["edit-task"],
    mutationFn: (updateData: IUpdateTask) =>
      tasksApi.updateTask(taskId, updateData),
    onSuccess: () => {
      navigate("/");
    },
  });

  if (isError) return <Alert variant="danger">Coś poszło nie tak</Alert>;
  return (
    <Container fluid>
      {(isLoading || isPending) && <LoadingSpinner />}
      <PageHeader title="Aktualizacja zadania" />
      <Row className="justify-content-center ">
        <Col sm={12} md={5}>
          {data?.data.description && (
            <TaskForm
              initData={{ description: data.data.description }}
              handleSubmit={handleUpdateTask}
              submitButtonText="Aktualizuj zadanie"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EditTaskPage;
