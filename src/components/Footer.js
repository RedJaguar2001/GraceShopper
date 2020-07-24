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

const Footer = (props) => {
  return(
  <Segment inverted vertical style={{ padding: '5em 0em', margin: '3em 0em 0em 0em', position: 'fixed'}}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item as='a'>Sitemap</List.Item>
              <List.Item as='a'>Contact Us</List.Item>
              <List.Item as='a'>Terms & Conditions</List.Item>
              <List.Item as='a'>Privacy Policy</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Services' />
            <List link inverted>
              <List.Item as='a'>Artisan Cheese</List.Item>
              <List.Item as='a'>Imported Meats</List.Item>
              <List.Item as='a'>Charcuterie Boards</List.Item>
              <List.Item as='a'>Cheese Consultation</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>
              Footer Header
            </Header>
            <p>
              Cottage cheese rubber cheese monterey jack. Pecorino brie boursin cheesecake swiss blue castello camembert de normandie parmesan.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)}

export default Footer;
