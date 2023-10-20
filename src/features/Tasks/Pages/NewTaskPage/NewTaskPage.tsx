import { useMutation } from "@tanstack/react-query";
import { setDocumentTitle } from "common/utils/setDocumentTitle";
import PageHeader from "components/PageHeader/PageHeader";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ITaskData, tasksApi } from "../../api/tasks.api";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import TaskForm from "../../components/TaskForm/TaskForm";

const NewTaskPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentTitle(`Nowe zadanie`);
  }, []);

  const { mutateAsync: handleCreateTask, isPending } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: (newTaskData: ITaskData) => tasksApi.createTask(newTaskData),
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <Container fluid>
      {isPending && <LoadingSpinner />}
      <PageHeader title="Nowe zadanie" />
      <Row className="justify-content-center ">
        <Col sm={12} md={5}>
          <TaskForm
            handleSubmit={handleCreateTask}
            submitButtonText="Utwórz zadanie"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default NewTaskPage;
