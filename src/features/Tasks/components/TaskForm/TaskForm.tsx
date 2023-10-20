import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { ITaskData } from "features/Tasks/api/tasks.api";

export const schema = yup.object({
  description: yup
    .string()
    .required("Opis zadania jest wymagany")
    .min(3, "Min. 3 znaki")
    .max(500, "Max. 500 znaków"),
});

interface IProps {
  initData?: ITaskData;
  submitButtonText: string;
  handleSubmit: (taskData: ITaskData) => Promise<any>;
}

const TaskForm: React.FC<IProps> = ({
  initData,
  submitButtonText,
  handleSubmit,
}) => {
  const formik = useFormik<ITaskData>({
    initialValues: initData || {
      description: "",
    },
    onSubmit: (values) => {
      return handleSubmit(values);
    },
    validationSchema: schema,
    validateOnMount: false,
  });

  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      <Form.Group controlId="task-form-description">
        <Form.Label>Opis zadania</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={5}
          placeholder="Opis zadania..."
          isInvalid={!!formik.errors.description}
          {...formik.getFieldProps("description")}
        />
        {formik.errors.description && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Button disabled={!formik.isValid} type="submit" className="w-100 mt-3">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default TaskForm;
