import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { registerAction } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterPage = () => {
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userData } = userRegister;

  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      navigate(redirect);
    }
  }, [navigate, userData, redirect]);

  const submitHadler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrMessage("Passwords are not same!\nCheck your input");
    } else {
      dispatch(registerAction(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {errMessage && <Message variant="danger">{errMessage}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHadler}>
        <Form.Group controlId="name">
          <Form.Label>Your Name:</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter you name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Your Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter you email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Your assword:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter you password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm password:</Form.Label>
          <Form.Control
            type="confirmPassword"
            placeholder="Confirm you password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="dark" className="my-3">
          Register!
        </Button>
      </Form>

      <Row className="my-3">
        <Col>
          Already have account?{" "}
          <Link to={redirect ? `/login/redirect=${redirect}` : "/login"}>
            Sign in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
