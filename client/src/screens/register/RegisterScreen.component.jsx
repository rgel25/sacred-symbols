import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import { register } from "../../store/users/usersActions";
import FormContainer from "../../components/form-container/FormContainer.component";

export default function RegisterScreen() {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
  }, []);

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (formData.password.length < 6)
      return setMessage("Passwords must be at least 6 characters.");
    if (formData.password !== formData.confirmPassword)
      return setMessage("Passwords do not match.");
    dispatch(register(formData.name, formData.email, formData.password));
    setFormData(initialFormData);
    setMessage("");
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form
          onSubmit={formSubmitHandler}
          noValidate
          className="needs-validation"
        >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={formChangeHandler}
              autoComplete="username"
              autoFocus
              name="name"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={formChangeHandler}
              autoComplete="username"
              autoFocus
              name="email"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={formChangeHandler}
              autoComplete="current-password"
              name="password"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={formChangeHandler}
              autoComplete="current-password2"
              name="confirmPassword"
              required
            ></Form.Control>
          </Form.Group>
          <div className="d-grid mt-3">
            <Button var="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      )}

      <Row className="py-3 mt-3">
        <Col className="text-center">
          Already have an account? <Link to="/login">Sign in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
