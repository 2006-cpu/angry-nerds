import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

import {Link, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {createOrder, addProductToOrder} from '../api'

const Prod = (props) => {
    // const {orderId} = useParams();
    const {setSelectedId, setCategorysel} = props
    const {id, name, description, price, imageurl, instock, category} = props.product

    const [quantity, setQuantity] = useState(1);

    // const [order, setOrder] = useState([]);
    // const [orderId, setOrderId] = useState('');

    const handleCart = async (event) => {
      try {

        //trying to just be able to add products into 1st order
                
        // setOrder('')
        // if(!order){
          // const newOrder = await createOrder();
          // const orderId = newOrder.id
          const orderId = 1
        // }
        // const productId = id
        setQuantity(1)
        const productOrder = await addProductToOrder(orderId, id, price, quantity)
        console.log("OID", orderId)
        console.log("PRODID", id)
        console.log("price", price)
        console.log("quant", quantity)
         
        console.log('OP hello', productOrder)
        
        // orders.products = productOrder
        // setProducts(orders.products)

      } catch (error) {
          console.error(error)
      }
  } 

  // useEffect(() => {
  //   handleCart()
  // },[]);
    
    return <Card style={{ width: '18rem', height: '40rem', margin: '1rem', 
    boxShadow: '0 6px 10px -5px' }} onClick={() => {
        console.log('selected product with id ', id)
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
        {instock ? <Button style={{float: 'left'}} variant="primary" size="sm" onClick={handleCart}>Add To Cart</Button>
         : <Button style={{float: 'left'}} href="#" variant="secondary" size="sm" disabled>Out of Stock</Button> }
      
      <Button style={{float: 'right'}} variant="secondary" size="sm" onClick={() => {setCategorysel(category)}} >Similar Items</Button>
    </Card.Body>
    </div>
  </Card>
}

export default Prod;