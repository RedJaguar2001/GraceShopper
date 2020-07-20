import React, {useState} from 'react';

import axios from "axios";
import { Button, Form } from 'semantic-ui-react'


const FormForCheckout = () => {
  const initialFormData = Object.freeze({
    firstname: "",
    lastname: "",
    billingadddress: "",
    fulladdress: "",
    phonenumber: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,


      [e.target.name]: e.target.value.trim()
    });
  };

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(formData);
        axios.post("api/orders/checkout", formData, {
          headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
        }).then(()=>{
          alert("Your Ordered has been sent")
        }).catch((error)=>{
          alert(error.message);
        })
      };

  return (
<Form >
    <Form.Group unstackable widths={2}>
      <Form.Input name="firstname" onChange={handleChange} />
      <Form.Input name='lastname' onChange={handleChange}/>
    </Form.Group>
    <Form.Group widths={2}>
      <Form.Input name="fulladdress" onChange={handleChange}/>
      <Form.Input name='billingadddress' onChange={handleChange} />
      <Form.Input name='phonenumber' onChange={handleChange} />
    </Form.Group>
    <Button onClick={handleSubmit}>Submit</Button>
  </Form>
)
  }

  export default FormForCheckout;