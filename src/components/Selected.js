import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

const SelectedProd = (props) => {
  const {user} = props
    const {id, name, description, price, imageurl, instock, category} = props.selected
    const [editingProduct, setEditingProduct] = useState(false)
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newInStock, setNewInStock] = useState(false)
    const [newImageURL, setNewImageURL] = useState(null)
    const [newCategory, setNewCategory] = useState('')

    const submittedProduct = async () => {
      try{
          //const newProduct = await apiFuncName({name, description, price, inStock, imageURL, category})
          console.log('name: ', newName, ',description: ', newDescription, ',price: ', newPrice, ',inStock: ',
          newInStock, ',imageURL: ', newImageURL, ',category: ', newCategory)
      }catch(error){
          console.error(error)
      }
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      submittedProduct()
      setEditingProduct(false)
  }

    return <Card style={{ width: '71rem', height: '52rem', margin: '1rem', 
    boxShadow: '0 6px 10px -5px', backgroundColor: '#e6faff' }}>
    {editingProduct ?
     <div>
     <Form.Group style={{marginLeft: '1rem', marginRight: '1rem', marginTop: '1rem', height: '45.9rem'}}>
 <h4 style={{paddingLeft: '1rem'}}>Product Name</h4>
<Form.Control value={newName} type="text" placeholder="" onChange={(e) => {setNewName(e.target.value)}} />
<br />
 <h4 style={{paddingLeft: '1rem'}}>Description</h4>
<Form.Control value={newDescription} type="text" placeholder="" onChange={(e) => {setNewDescription(e.target.value)}} />

<h4 style={{paddingLeft: '1rem'}}>Price</h4>
<Form.Control value={newPrice} type="integer" placeholder="" onChange={(e) => {setNewPrice(e.target.value)}} />

<h4 style={{paddingLeft: '1rem'}}>image URL</h4>
<Form.Control value={newImageURL} type="text" placeholder="" onChange={(e) => {setNewImageURL(e.target.value)}} />

<h4 style={{paddingLeft: '1rem'}}>Category</h4>
<Form.Control value={newCategory} type="text" placeholder="" onChange={(e) => {setNewCategory(e.target.value)}} />

 <Form.Check type="checkbox" style={{marginLeft: '1rem', marginTop: '1rem'}}  onChange={(e) => {
     if(e.target.value === 'on'){
      setNewInStock(true)
     }else{
      setNewInStock(e.target.value)}}} label="In Stock? " />
<Button type="submit" onClick={handleSubmit} style={{marginLeft: '1rem', marginTop: '1rem'}} variant="success">Enter</Button>
</Form.Group>
 </div> 
     : <><Card.Img style={{width: '23rem', backgroundColor: '#e6faff'}}variant="top" src={imageurl ? imageurl : "https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg"} />
    <Card.Body style={{backgroundColor: '#e6faff'}}>
<Card.Title>{name}</Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
<ListGroupItem style={{backgroundColor: '#e6e6e6'}}>{category}</ListGroupItem>
<ListGroupItem style={{backgroundColor: '#e6faff'}}>{price}</ListGroupItem>
    </ListGroup></>}
    
    <div style={{height: '4rem', backgroundColor: '#e6e6e6'}}>
    <Card.Body>
      {instock ? <Button style={{float: 'left'}} variant="primary" size="sm">Add To Cart</Button>
         : <Button style={{float: 'left'}} href="#" variant="secondary" size="sm" disabled>Out of Stock</Button> }  
      {user && user.isAdmin ? <>
      <Button style={{float: 'right'}} variant="danger" size="sm">Delete Listing</Button>
      <Button style={{float: 'right', marginRight: '1rem'}} onClick={() => {setEditingProduct(!editingProduct)}}variant="info" size="sm">Edit Listing</Button></>
       : <Button style={{float: 'right'}} variant="secondary" size="sm">Similar Items</Button> }   
      
    </Card.Body>
    </div>
  </Card>
}




export default SelectedProd;