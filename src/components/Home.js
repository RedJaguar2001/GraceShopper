import React from 'react';
import {
  Container,
  Divider,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';



const HomepageLayout = () => (
  <div>
    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>WELCOME TO CHEESE WIZARDS</Header>
      <Image size='large' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRoQDJUuzhE5MneFhgbU5Ij9gFcOCIF14Py2g&usqp=CAU'/>
      <p>At Cheese Wiazards, we are all about the cheese</p>
      <p>
        Founded in 2015 in California, we offer the best of the best...cheese
      </p>
    </Container>

    <Segment
        vertical style={{  backgroundColor: "yellow" , margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container  style={{
        backgroundColor: 'orange',}}
           textAlign='center'>

        <Divider inverted section />
        <Image centered size='mini' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFG6E90BJmHhB7JaUXg1XaWpQmxA8NGLNJqA&usqp=CAU' />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item  as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);


export default HomepageLayout;
