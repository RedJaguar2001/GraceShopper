import React, {useState} from 'react';

import axios from "axios";
import { Button, Form , Header, Container} from 'semantic-ui-react'


const FormForCheckout = () => {

  const initialFormData =({
    firstname: "",
    lastname: "",
    billingadddress: "",
    fulladdress: "",
    phonenumber: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [successForm, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,


      [e.target.name]: e.target.value.trim()
    });
  };

  const clearState = () => {
    setState({ ...initialFormData });
  };

    const handleSubmit = (e) => {
      e.preventDefault()
      setSuccess(!successForm);
      console.log(formData);
        axios.post("api/orders/checkout", formData, {
          headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
        }).then(()=>{
      
        }).catch((error)=>{
          alert(error.message);
        })
      };

      return (

        
          <>
      
            <div>
              {successForm ? (
                <>
                     <Header as='h1' textAlign='center'>
                     Your Details are Compelete and Your Order will be Shipped Soon
       
     
    <Form  >
      <Form.Group unstackable widths={2}>
        < Form.Input label = "First Name" name="firstname"  onChange={handleChange} />
          <Form.Input label= "Last Name" name='lastname' onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label = "Full Address" name="fulladdress" onChange={handleChange}/>
          <Form.Input  label = "Billing Address" name='billingadddress' onChange={handleChange} />
          <Form.Input  label = "Phone Number" name='phonenumber' onChange={handleChange} />
        </Form.Group>
      
      </Form>
      </Header>

                </>
              ) : (  
              
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
              <Button onClick={handleSubmit}>
        Toggle condition</Button>
          
              </Form>
              </Header>
                
              )}
            </div>
           
          </>
        );
      };
  
      


     
     
       
  export default FormForCheckout;