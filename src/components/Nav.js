import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Login } from "./index";

const Nav = (props) => {
  const {user, setUser} = props;
  const history = useHistory();

  return (
    <Menu
      style={{
        backgroundColor: "yellow",
      }}
    >
      <Menu.Item
        as="a"
        header
        style={{
          backgroundColor: "orange",
        }}
      >
        <Image
          size="mini"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFG6E90BJmHhB7JaUXg1XaWpQmxA8NGLNJqA&usqp=CAU"
          style={{ marginRight: "1.5em" }}
        />
        Cheese-Wizards
      </Menu.Item>
      <Menu.Item as="a" onClick={() => history.push("/")}>
        Home
      </Menu.Item>

      <Dropdown
        style={{
          backgroundColor: "orange",
        }}
        item
        simple
        text="MENU"
      >
        <Dropdown.Menu>
          {[
            { text: "Products", route: "/products" },
            { text: "Cart", route: "/cart" },
            { text: "Order History", route: "/orderhistory" },
          ].map(({ text, route }) => (
            <Dropdown.Item key={text} onClick={() => history.push(`${route}`)}>
              {text}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Login user={user} setUser={setUser} />
    </Menu>
  );
};

export default Nav;
