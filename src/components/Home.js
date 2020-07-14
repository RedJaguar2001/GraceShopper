
import React from 'react'
import { Segment, Image } from 'semantic-ui-react'

const src = 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2017%2F06%2Fhuge-wheel-of-cheese-in-white-house-fwx-2000.jpg'

const ImageExampleFloated = () => (
  <Segment>
    <Image src={src} size='huge' floated='left' />
    <p>
    At Cheese Wizards we are all about the cheese!!!!!!!! Founded in 2015, we offer the best of the best....cheese
    </p>

  </Segment>
)

export default ImageExampleFloated



