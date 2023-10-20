import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { setDocumentTitle } from "common/utils/setDocumentTitle";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { authApi, IRegisterData } from "../../api/auth.api";

export const schema = yup.object({
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Nieprawidłowy format")
    .min(3, "Min. 3 znaki")
    .max(50, "Max. 50 znaków"),
  password: yup
    .string()
    .required("Hasło jest wymagane")
    .min(5, "Min. 5 znaków"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentTitle(`Rejestracja`);
  }, []);

  const { mutate: handleRegister, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (registerData: IRegisterData) => authApi.register(registerData),
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (error: AxiosError<any>) => {
      if (error.response?.data?.message === "Email occupied") {
        formik.setErrors({ email: "Email zajęty" });
      }
    },
  });

  const formik = useFormik<IRegisterData & { passwordConfirm: string }>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      const { passwordConfirm, ...newUserData } = values;
      return handleRegister(newUserData);
    },
    validationSchema: schema,
    validate: (values) => {
      const errors: any = {};
      if (values.passwordConfirm !== values.password) {
        errors.passwordConfirm = "Hasła muszą być identyczne";
      }
      return errors;
    },
    validateOnMount: false,
  });

  return (
    <Container fluid>
      {isPending && <LoadingSpinner />}
      <Row className="justify-content-center mt-5">
        <Col sm={12} md={4}>
          <Form onSubmit={formik.handleSubmit} noValidate>
            <Form.Group controlId="register-form-email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="E-mail"
                isInvalid={!!formik.errors.email}
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="register-form-password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                autoComplete="0"
                required
                type="password"
                placeholder="hasło"
                isInvalid={!!formik.errors.password}
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="register-form-passwordConfirm">
              <Form.Label>Powtórz hasło</Form.Label>
              <Form.Control
                autoComplete="0"
                required
                type="password"
                placeholder="Powtórz hasło"
                isInvalid={!!formik.errors.passwordConfirm}
                {...formik.getFieldProps("passwordConfirm")}
              />
              {formik.errors.passwordConfirm && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.passwordConfirm}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              disabled={!formik.isValid}
              type="submit"
              className="w-100 mt-3"
            >
              Utwórz konto
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
