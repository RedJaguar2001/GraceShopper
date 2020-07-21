import React from 'react';
import { Item, Button, Input, Icon } from 'semantic-ui-react';

const CartProduct = ({ product }) => {
    return (
        // <Item.Group divided style={{
        //     margin: '.5em',
        //     padding: '.5em',
        //     backgroundColor: 'white',
        //     borderTop: '1px solid grey'
        //     }}>
        //     <Item>
        //       <Item.Image as='a' src={!image ? 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555359686/shape/mentalfloss/cheesefinal.jpg?itok=rL-I9_bI' : image.img_src}/>

        //       <Item.Content>
        //         <Item.Header><Icon name='dollar'/>{price}</Item.Header>
        //         <Button size='small' floated='right' color='red'>X</Button>
        //         <Item.Meta>
        //           <span className='productName'>{title}</span>
        //         </Item.Meta>
        //         <Item.Description style={{margin: '.5em'}}>{description}</Item.Description>
        //         <Input type='number' placeholder='Qty' min='0'/>
        //         <Item.Extra>
        //           <Button><Icon name='heart'/>Save for later</Button>
        //         </Item.Extra>
        //       </Item.Content>
        //     </Item>
        //   </Item.Group>
        <Item.Group divided style={{
          margin: '.5em',
          padding: '.5em',
          backgroundColor: 'yellow',
          borderTop: '1px solid grey'
          }}>
          <Item>
            <Item.Image as='a' src='https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555359686/shape/mentalfloss/cheesefinal.jpg?itok=rL-I9_bI' />

            <Item.Content>
              <Item.Header><Icon name='dollar'/>7.99</Item.Header>
              <Button size='small' floated='right' color='red'>X</Button>
              <Item.Meta>
                <span className='productName'>Swiss Cheese</span>
              </Item.Meta>
              <Item.Description style={{margin: '.5em'}}>It ain't easy bein cheesy</Item.Description>
              <Input type='number' placeholder='Qty' min='0'/>
              <Item.Extra>
                <Button><Icon name='heart'/>Save for later</Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
    )
}

export default CartProduct;