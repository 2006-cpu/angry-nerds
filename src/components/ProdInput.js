import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const ProductInput = (props) => {
    const {setAdminToggle} = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [inStock, setInStock] = useState(false)
    const [imageURL, setImageURL] = useState(null)
    const [category, setCategory] = useState('')

    const addProduct = async () => {
        try{
            //const newProduct = await apiFuncName({name, description, price, inStock, imageURL, category})
            console.log('name: ', name, ',description: ', description, ',price: ', price, ',inStock: ',
             inStock, ',imageURL: ', imageURL, ',category: ', category)
        }catch(error){
            console.error(error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addProduct()
        setAdminToggle(false)
    }

    return <div>
        <Form.Group style={{marginLeft: '1rem', marginRight: '1rem'}}>
    <h4 style={{paddingLeft: '1rem'}}>Product Name</h4>
  <Form.Control value={name} type="text" placeholder="" onChange={(e) => {setName(e.target.value)}} />
  <br />
    <h4 style={{paddingLeft: '1rem'}}>Description</h4>
  <Form.Control value={description} type="text" placeholder="" onChange={(e) => {setDescription(e.target.value)}} />

  <h4 style={{paddingLeft: '1rem'}}>Price</h4>
  <Form.Control value={price} type="integer" placeholder="" onChange={(e) => {setPrice(e.target.value)}} />

  <h4 style={{paddingLeft: '1rem'}}>image URL</h4>
  <Form.Control value={imageURL} type="text" placeholder="" onChange={(e) => {setImageURL(e.target.value)}} />

  <h4 style={{paddingLeft: '1rem'}}>Category</h4>
  <Form.Control value={category} type="text" placeholder="" onChange={(e) => {setCategory(e.target.value)}} />

    <Form.Check type="checkbox" style={{marginLeft: '1rem', marginTop: '1rem'}}  onChange={(e) => {
        if(e.target.value === 'on'){
            setInStock(true)
        }else{
            setInStock(e.target.value)}}} label="In Stock? " />
  <Button type="submit" onClick={handleSubmit} style={{marginLeft: '1rem', marginTop: '1rem'}} variant="success">Enter</Button>
</Form.Group>
    </div>
}
export default ProductInput;