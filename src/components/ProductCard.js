import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

import {Link, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Prod = (props) => {
    const {id, name, description, price, imageURL, inStock, category} = props
    
    return <Card style={{ width: '18rem', margin: '1rem', 
    boxShadow: '0 6px 10px -5px' }} onClick={() => {console.log('selected product with id ', id)}}>
    <Card.Img variant="top" src={imageURL} />
    <Card.Body>
<Card.Title><Link to="/products/:productId">{name}</Link></Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
<ListGroupItem>{category}</ListGroupItem>
<ListGroupItem>{price}</ListGroupItem>
    </ListGroup>
    <div style={{height: '4rem'}}>
    <Card.Body>
        {inStock ? <Button style={{float: 'left'}} variant="primary" size="sm">Add To Cart</Button>
         : <Button style={{float: 'left'}} href="#" variant="secondary" size="sm" disabled>Out of Stock</Button> }
      
      <Button style={{float: 'right'}} variant="secondary" size="sm">Similar Items</Button>
    </Card.Body>
    </div>
  </Card>
}

export default Prod;