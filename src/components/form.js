import React, {useState} from 'react';

import axios from "axios";
import { Button, Form , Header, Container} from 'semantic-ui-react'


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
          alert("Your Order has Been Sent")
        }).catch((error)=>{
          alert(error.message);
        })
      };

  return (
 <Header as='h1' textAlign='center'>
    You are in checkout, we just need your info
 
<Form >
  <Form.Group unstackable widths={2}>
    < Form.Input label = "First Name" name="firstname"  onChange={handleChange} />
      <Form.Input label= "Last Name" name='lastname' onChange={handleChange}/>
    </Form.Group>
    <Form.Group widths={2}>
      <Form.Input label = "Full Address" name="fulladdress" onChange={handleChange}/>
      <Form.Input  label = "Billing Address" name='billingadddress' onChange={handleChange} />
      <Form.Input  label = "Phone Number" name='phonenumber' onChange={handleChange} />
    </Form.Group>
    <Button onClick={handleSubmit}>Submit</Button>
  </Form>
  </Header>
)
  }

  export default FormForCheckout;