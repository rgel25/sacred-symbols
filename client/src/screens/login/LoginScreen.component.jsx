import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import { login } from "../../store/users/usersActions";
import FormContainer from "../../components/form-container/FormContainer.component";

export default function LoginScreen() {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

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
    dispatch(login(formData.email, formData.password));
    if (searchParams.get("redirect")) {
      navigate("/shipping");
    }
  };
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form
          onSubmit={formSubmitHandler}
          noValidate
          className="needs-validation"
        >
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
          <div className="d-grid mt-3">
            <Button var="primary" type="submit">
              Sign In
            </Button>
          </div>
        </Form>
      )}

      <Row className="py-3 mt-3">
        <Col className="text-center">
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
