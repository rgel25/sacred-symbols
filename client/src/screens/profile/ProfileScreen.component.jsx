import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import {
  getUserDetails,
  updateUserProfile,
} from "../../store/users/usersActions";
import { listMyOrders } from "../../store/order/orderActions";
import { USER_ACTION_TYPES } from "../../store/users/usersTypes";

const ProfileScreen = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [editPassword, setEditPassword] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_ACTION_TYPES.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: user.name,
          email: user.email,
        }));
      }
    }
  }, [navigate, dispatch, userInfo, user, success]);

  useEffect(() => {
    (() => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }, [editPassword]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditPassword = () => {
    setMessage(null);
    setEditPassword((prevEditPassword) => !prevEditPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setUpdateSuccess(null);

    if (editPassword) {
      if (formData.password.length < 6) {
        setMessage("Passwords must be at least 6 characters");
      } else if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match");
      } else {
        dispatch(
          updateUserProfile({
            id: user._id,
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        );
        setUpdateSuccess("Profile updated!");
      }
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: formData.name,
          email: formData.email,
        })
      );
      setUpdateSuccess("Profile updated!");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {updateSuccess && <Message variant="success">{updateSuccess}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form
            onSubmit={submitHandler}
            noValidate
            className="needs-validation"
          >
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleFormChange}
                name="name"
                autoFocus
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleFormChange}
                name="email"
                autoComplete="username"
                required
              ></Form.Control>
            </Form.Group>
            {editPassword ? (
              <>
                <div className="d-grid mb-3">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleEditPassword}
                  >
                    Cancel Editing Password
                  </Button>
                </div>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleFormChange}
                    autoComplete="new-password"
                    name="password"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    autoComplete="confirm-new-password"
                    name="confirmPassword"
                    required
                  ></Form.Control>
                </Form.Group>
              </>
            ) : (
              <div className="d-grid mb-3">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleEditPassword}
                >
                  Edit Password
                </Button>
              </div>
            )}
            <div className="d-grid">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td className="text-center">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
