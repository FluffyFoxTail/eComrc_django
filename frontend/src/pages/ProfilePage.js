import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  userDetailAction,
  updateUserProfileAction,
} from "../actions/userActions";
import { getAllOrdersAction } from "../actions/orderActions";

import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfilePage = () => {
  //const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { error, loading, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const ListOrders = useSelector((state) => state.userListOrders);
  const { loading: ordersLoading, error: ordersError, orders } = ListOrders;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        dispatch(userDetailAction("profile"));
        dispatch(getAllOrdersAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, dispatch, userData, user, success]);

  const submitHadler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrMessage("Password is not same!\nCheck your input");
    } else {
      console.log("Onclick");
      dispatch(
        updateUserProfileAction({
          id: user.id,
          name,
          email,
          password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User profile</h2>
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
            Update info!
          </Button>
        </Form>
      </Col>

      <Col>
        <h2>My orders:</h2>
        {ordersError && <Message variant="danger">{error}</Message>}
        {ordersLoading && <Loader />}
        <Table striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.created_at}</td>
                <td>$ {order.total_price}</td>
                <td>
                  {order.is_paid ? (
                    <i className="fa-solid fa-check">{` Paid at ${order.paid_at}`}</i>
                  ) : (
                    <i className="fa-solid fa-circle-minus" />
                  )}
                </td>
                <td>
                  {order.is_delivered ? (
                    <i className="fa-solid fa-check">{` Delivered at ${order.delevered_at}`}</i>
                  ) : (
                    <i className="fa-solid fa-circle-minus" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/myorders/${order.id}`}>
                    <Button variant="success">Detail</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProfilePage;
