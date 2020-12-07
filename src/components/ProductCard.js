import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiShoppingCart } from "react-icons/fi";

import {createOrder, addProductToOrder} from '../api'

const Prod = (props) => {
    const {setSelectedId, setCategorysel} = props
    const {id, name, description, price, imageurl, instock, category} = props.product

    const [quantity, setQuantity] = useState(1);

    const [order, setOrder] = useState({});
    const [orderId, setOrderId] = useState(3); //id:3 is backup empty cart in db

    const handleCart = async (event) => {
      try {
                
        if(!order){
          const newOrder = await createOrder();
          setOrder(newOrder)
          const orderId = newOrder.id
          setOrderId(orderId)
        }

        setQuantity(1)
        const productOrder = await addProductToOrder(orderId, id, price, quantity)

      } catch (error) {
          console.error(error)
      }
  } 
    
    return <Card style={{ width: '18rem', height: '40rem', margin: '1rem', 
    boxShadow: '0 6px 10px -5px' }} onClick={() => {
        setSelectedId(id)
        }}>
    <Card.Img variant="top" src={imageurl ? imageurl : "https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg"} />
    <Card.Body>
<Card.Title><Link to={`/product/${id}`}>{name}</Link></Card.Title>
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
      {instock ? <Button style={{float: 'left'}} variant="primary" size="sm" onClick={handleCart}>{<FiShoppingCart/>}Add To Cart</Button>
         : <Button style={{float: 'left'}} href="#" variant="secondary" size="sm" disabled>Out of Stock</Button> }
      
      <Button style={{float: 'right'}} variant="secondary" size="sm" onClick={() => {setCategorysel(category)}} >Similar Items</Button>
    </Card.Body>
    </div>
  </Card>
}

export default Prod;