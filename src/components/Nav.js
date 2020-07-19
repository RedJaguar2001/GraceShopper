import React from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react';

const Nav = () => {
  const history = useHistory();

  return (
    <Menu style={{
      backgroundColor: 'yellow',}}>
    <Container style={{
      backgroundColor: 'yellow',}}>
      <Menu.Item as='a' header
      style ={{
        backgroundColor: "orange"}


      }>
        <Image size='mini' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFG6E90BJmHhB7JaUXg1XaWpQmxA8NGLNJqA&usqp=CAU' style={{ marginRight: '1.5em' }} />
        Cheese Wizards
      </Menu.Item>
      <Menu.Item as='a' onClick={() => history.push("/")}>Home</Menu.Item>

      <Dropdown
      style ={{

        backgroundColor: "orange"
      }}
       item simple text='MENU'>
        <Dropdown.Menu>
          {[
            { text: "Products", route: "/products" },
            { text: "User Profile", route: "/profile" },
            { text: "Cart", route: "/cart" }
          ].map(
            ({ text, route }) => (
            <Dropdown.Item key={text} onClick={() => history.push(`${route}`)}>{text}</Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  </Menu>
  );
};

export default Nav;
