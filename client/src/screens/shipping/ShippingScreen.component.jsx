import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../store/cart/cartActions";
import FormContainer from "../../components/form-container/FormContainer.component";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps.component";

export default function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialFormData = {
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  };

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

  const [formData, setFormData] = useState(initialFormData);

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ ...formData }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Shipping</h2>
      <Form
        onSubmit={formSubmitHandler}
        noValidate
        className="needs-validation"
      >
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={formData.address}
            onChange={formChangeHandler}
            autoFocus
            name="address"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={formChangeHandler}
            name="city"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={formData.postalCode}
            onChange={formChangeHandler}
            name="postalCode"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={formData.country}
            onChange={formChangeHandler}
            name="country"
            required
          ></Form.Control>
        </Form.Group>
        <div className="d-grid">
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
