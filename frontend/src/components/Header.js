import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { logoutAction } from "../actions/userActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return (
    <header>
      <Navbar bg="success" expand="lg" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>eComrc</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/order">
                <Nav.Link>
                  <i className="fa fa-shopping-cart">Order</i>
                </Nav.Link>
              </LinkContainer>

              {userData ? (
                <NavDropdown title={userData.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa fa-solid fa-right-to-bracket">Login</i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
