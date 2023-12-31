import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "features/Auth/api/auth.api";
import { useNavigate } from "react-router";
import { authActions } from "common/store/actions/auth";
import { useAppDispatch } from "common/store/hooks";
import { Link } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authApi.logout(),
    onSuccess: async (res) => {
      dispatch(authActions.logout());
      navigate("/auth/login");
    },
  });

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">TasksAppLogo</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/new-task">
              Nowe zadanie
            </Nav.Link>
            <Nav.Link onClick={() => logout()}>Wyloguj</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
