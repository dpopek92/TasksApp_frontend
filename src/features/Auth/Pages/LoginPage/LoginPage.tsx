import { useMutation } from "@tanstack/react-query";
import { setDocumentTitle } from "common/utils/setDocumentTitle";
import { setTokens } from "common/utils/setTokens";
import { useFormik } from "formik";
import useUser from "features/Users/hooks/useUser";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { authApi, ILoginData } from "../../api/auth.api";
import * as yup from "yup";
import { AxiosError } from "axios";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

export const schema = yup.object({
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Nieprawidłowy format"),
  password: yup.string().required("Hasło jest wymagane"),
});

const LoginPage = () => {
  const { user, refetchUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentTitle(`Strona logowania`);
  }, []);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData: ILoginData) => authApi.login(loginData),
    onSuccess: async (res) => {
      setTokens(res.data);
      refetchUser();
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        formik.setErrors({
          email: "Nieprawidłowe dane logowania",
          password: "Nieprawidłowe dane logowania",
        });
      }
    },
  });

  const formik = useFormik<ILoginData>({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => handleLogin(values),
    validationSchema: schema,
  });

  if (!!user) navigate("/");
  return (
    <Container fluid>
      {isPending && <LoadingSpinner />}
      <Row className="justify-content-center mt-5">
        <Col sm={12} md={4}>
          <Form onSubmit={formik.handleSubmit} noValidate>
            <Form.Group controlId="login-form-email">
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

            <Form.Group controlId="login-form-password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Hasło"
                isInvalid={!!formik.errors.password}
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              disabled={!formik.isValid}
              type="submit"
              className="w-100 mt-3"
            >
              Zaloguj
            </Button>
            <Button
              variant="outline-primary"
              className="w-100 mt-3"
              onClick={() => navigate(`/auth/register`)}
            >
              Utwórz konto
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
