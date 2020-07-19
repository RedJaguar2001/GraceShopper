import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, Icon, Modal, Header, Menu } from "semantic-ui-react";

const Login = (props) => {
  const { user, setUser } = props;
  const [state, setState] = useState({});

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
    console.log(state);
  };

  async function handleRegister(event) {
    event.preventDefault();
    console.log(state);
    const register = {
      name: "test",
      username: "test",
      password: "password",
      email: "test@test.test",
    };

    axios.post("api/users/register", register).then((res) => {
      const userData = res.data;
      console.log("register data: ", userData);
      localStorage.setItem("token", userData.token);
      return setUser(userData.user);
    });
  }

  async function handleLogin(event) {
    event.preventDefault();
    console.log(state);
    // const register = {
    //   password: "password",
    //   email: "test@test.test",
    // };

    axios.post("api/users/login", state).then((res) => {
      const userData = res.data;
      console.log("login data: ", userData);
      localStorage.setItem("token", userData.token);
      setState({});
      setUser(userData.user);
    });
  }

  async function handleLogout(event) {
    event.preventDefault();
    console.log(event.target.value);
    localStorage.removeItem('token');
    setUser({});
  }

  if (user.id) {
    return (
      <Menu.Item position="right">
        <Button content="Logout" onClick={handleLogout} />
      </Menu.Item>
    );
  } else {
    return (
      <Menu.Item position="right">
        <Modal
          dimmer="blurring"
          trigger={<Button>Register</Button>}
          basic
          size="small"
        >
          <Header content="Signup for an account" />
          <Modal.Content>
            <Form onSubmit={handleRegister}>
              <Form.Input
                label="Full Name"
                placeholder="Full Name"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Username"
                placeholder="Username"
                name="username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Password"
                placeholder="Password"
                name="password"
                value={state.password}
                required
              />
              <Form.Button content="Submit" />
            </Form>
          </Modal.Content>
        </Modal>
        <Modal
          dimmer="blurring"
          trigger={<Button>Login</Button>}
          basic
          size="small"
        >
          <Header content="Log in" />
          <Modal.Content>
            <Form onSubmit={handleLogin}>
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Password"
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Form.Button content="Submit" onClick={close} />
            </Form>
          </Modal.Content>
        </Modal>
      </Menu.Item>
    );
  }
};

export default Login;
