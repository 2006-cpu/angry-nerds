import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

const SelectedProd = (props) => {
    const {id, name, description, price, imageurl, instock, category} = props.selected

    return <Card style={{ width: '71rem', height: '52rem', margin: '1rem', 
    boxShadow: '0 6px 10px -5px' }} onClick={() => {
        console.log('selected product with id ')
        }}>
    <Card.Img variant="top" src={imageurl} />
    <Card.Body style={{backgroundColor: '#e6faff'}}>
<Card.Title>{name}</Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
<ListGroupItem style={{backgroundColor: '#e6e6e6'}}>{category}</ListGroupItem>
<ListGroupItem style={{backgroundColor: '#e6faff'}}>{price}</ListGroupItem>
    </ListGroup>
    <div style={{height: '4rem', backgroundColor: '#e6e6e6'}}>
    <Card.Body>
      {instock ? <Button style={{float: 'left'}} variant="primary" size="sm">Add To Cart</Button>
         : <Button style={{float: 'left'}} href="#" variant="secondary" size="sm" disabled>Out of Stock</Button> }  
      <Button style={{float: 'right'}} variant="secondary" size="sm">Similar Items</Button>
    </Card.Body>
    </div>
  </Card>
}




export default SelectedProd;