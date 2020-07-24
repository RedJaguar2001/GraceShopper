import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { useHistory } from "react-router-dom";

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

const HomepageHeading = ({ mobile }) => {
  const history = useHistory();
    return (
      <Container
        fluid
        style={{
          backgroundColor: "transparent"
        }}>
        <Image
            src="https://www.foodiesfeed.com/wp-content/uploads/2019/02/cheese-with-honey-salty-biscuits-and-grapes.jpg"

            centered
            />

        <Header
          as='h1'
          content='Welcome to Cheese Wizards'
          inverted
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '1em',
            backgroundColor: "transparent"
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
        <Button
          primary
          color
          size='huge'
          onClick={() => history.push("/products")}>
          See What We Offer
          <Icon name='right arrow' />
        </Button>
      </Container>
)}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >

            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
<ResponsiveContainer>
  <div>
    <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Help Companies and Companions
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We can give your company superpowers to do things that they never thought possible.
                Let us delight your customers and empower your needs... through pure data analytics.
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Make Cheese That Can Dance
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Yes that's right, you thought it was the stuff of dreams, but even cheese can be
                bioengineered.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

    <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "If you're looking for the highest quality cheese, look no further."
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='https://images.pexels.com/photos/2494654/pexels-photo-2494654.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' size='tiny'/>
                <b>Jeff DuFromage</b> Chief Fun Officer Cheese Factory
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Cutting the Cheese, Grabs Your Attention
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            We love cheese, especially cottage cheese brie. Goat cheese on toast when the cheese comes out everybody's happy croque monsieur caerphilly swiss cheese slices cheese strings. Parmesan queso cheese strings blue cheese goat stilton swiss cut the cheese. Blue cheese say cheese chalk and cheese the big cheese cheesy feet fondue.
          </p>
          <Button as='a' size='large'>
            Read More
          </Button>

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Artisan Cheese</a>
          </Divider>

          <Header as='h3' style={{ fontSize: '2em' }}>
            Did We Tell You About Our Cheese?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes when the cheese comes out everybody's happy cottage cheese. Macaroni cheese bocconcini danish fontina bocconcini pecorino ricotta pepper jack cheesy grin fromage brie cheesy grin halloumi fromage frais he cheese bocconcini cheese and biscuits.
          </p>
          <Button as='a' size='large' >
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment>
     </div>
</ResponsiveContainer>
);

export default HomepageLayout;
