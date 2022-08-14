import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../store/cart/cartActions";
import FormContainer from "../../components/form-container/FormContainer.component";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps.component";

export default function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const dispatch = useDispatch();
  const initialFormData = {
    paymentMethod: "PayPal",
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
    dispatch(savePaymentMethod(formData.paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form
        onSubmit={formSubmitHandler}
        noValidate
        className="needs-validation"
      >
        <Form.Group>
          <Form.Label as="legend">Select method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              required
              onChange={formChangeHandler}
            ></Form.Check>
          </Col>
        </Form.Group>
        <div className="d-grid mt-3">
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
