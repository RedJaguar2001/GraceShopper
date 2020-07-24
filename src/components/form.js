import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Header } from "semantic-ui-react";

const FormForCheckout = ({ activeCart, setActiveCart }) => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    billingAddress: "",
    fullAddress: "",
    phoneNumber: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successForm, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(!successForm);
    console.log(formData);
    axios
      .post("api/orders/checkout", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setActiveCart([]);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div>
        {successForm ? (
          <>
            <Header as="h1" textAlign="center">
              Your Details are Complete and Your Order will be Shipped Soon!
              Thank You.
            </Header>
          </>
        ) : (
          <Header as="h1" textAlign="center">
            You are in checkout, we just need your info
            <Form>
              <Form.Group unstackable widths={2}>
                <Form.Input
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input
                  label="Full Address"
                  name="fullAddress"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Billing Address"
                  name="billingAddress"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button onClick={handleSubmit}>Submit Your Order</Button>
            </Form>
          </Header>
        )}
      </div>
    </>
  );
};

export default FormForCheckout;