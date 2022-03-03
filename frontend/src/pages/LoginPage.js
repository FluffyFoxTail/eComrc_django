import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { loginAction } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginPage = () => {
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userData } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      navigate(redirect);
    }
  }, [navigate, userData, redirect]);

  const submitHadler = (event) => {
    event.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHadler}>
        <Form.Group controlId="email">
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
        <Button type="submit" variant="dark" className="my-3">
          Sign in
        </Button>
      </Form>

      <Row className="my-3">
        <Col>
          New here?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
