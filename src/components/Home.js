import PropTypes from 'prop-types'
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container fluid>
    <Header
      as='h1'
      content='Welcome to Cheese Wizards'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='We cut the cheese.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      See What We Offer
      <Icon name='right arrow' />
    </Button>
  </Container>
)

const HomepageLayout = () => (
  <div>
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">WELCOME TO CHEESE WIZARDS</Header>
      <Image
        size="large"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRoQDJUuzhE5MneFhgbU5Ij9gFcOCIF14Py2g&usqp=CAU"
      />
      <p>At Cheese-Wizards, we are all about the cheese</p>
      <p>
        Founded in 2015 in California, we offer the best of the best...cheese
      </p>
    </Container>

    <Segment
      vertical
      style={{
        backgroundColor: "yellow",
        margin: "5em 0em 0em",
        padding: "5em 0em",
      }}
    >
      <Container
        style={{
          backgroundColor: "orange",
        }}
        textAlign="center"
      >
        <Divider inverted section />
        <Image
          centered
          size="mini"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFG6E90BJmHhB7JaUXg1XaWpQmxA8NGLNJqA&usqp=CAU"
        />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);

export default HomepageLayout;
