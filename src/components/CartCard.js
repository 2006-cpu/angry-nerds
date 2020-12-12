import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiShoppingCart } from "react-icons/fi";

import {createOrder, addProductToOrder, getProductById, deleteOrderProduct} from '../api'
import {getCurrentCart, getCurrentToken, storeCurrentCart} from '../auth'

const CartProduct = (props) => {
    const {product, setEditOrders, editOrders, setTotal, opid, setOpid} = props
    const {id, name, description, price, imageurl, instock, category} = props.product
    const [loggedIn, setLoggedIn] = useState(getCurrentToken())

    const [quantity, setQuantity] = useState(1);

    const handleCart = async (event) => {
        try {
            // if(loggedIn){   
                //get order_product id
                // const deleteOP = await deleteOrderProduct(opid)
        //  } else if(!loggedIn){
             console.log('we good')
             const grabbedCart = getCurrentCart();
             console.log('clicked with id ', id)
             console.log('grabbed from localstorage before ', grabbedCart)
             console.log('editcart', editOrders)
             const newCart = []
             grabbedCart.filter(storedProduct => {
                 if(storedProduct.id !== product.id){
                     console.log('one of them, ', storedProduct)
                     newCart.push(storedProduct)
                 }
             })
             let priceArr = []
             newCart.forEach(product => {
                    priceArr.push(Number(product.price))
                 })
                 console.log('arr ', priceArr)
                 let newTotal = 0
                 for (let i=0; i<priceArr.length; i++){
                     newTotal+=priceArr[i]
                 }
                 setTotal(newTotal)
         
             storeCurrentCart(newCart)
             setEditOrders(id)
             console.log('grabbed from localstorage after ', newCart)
             console.log('editcart', editOrders)
        //    }
        } catch (error) {
            console.error(error)
        }
    } 
    
    return <div style={{display: 'flex', backgroundColor: 'lightGrey', border: '1px solid grey',
    marginTop: '1rem', padding: '1rem', borderRadius: '15px', justifyContent: 'space-between'}}>
        <div style={{display: 'flex'}}><img src={`${imageurl}`} style={{width: '10rem', border: '1px solid grey',
         borderRadius: '15px', marginRight: '2rem'}}></img>
        <div>
       <h3>{name}</h3>
       <h4>${price}</h4>
       </div></div>
       <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '8.5rem'}}>
           <div style={{display: 'flex', flexDirection: 'column', marginTop: '2.5rem'}}> 
       <label style={{textAlign: 'center'}}>Quantity:</label>
       <input style={{marginLeft: '2rem', width: '4rem', textAlign: 'center'}} type="number" id="quantity" min="1" max="5"/>
       </div>
       <Button style={{borderRadius: '9px', height: '2.5rem'}} onClick={handleCart} variant="danger" size="sm">Remove from Cart</Button>
       </div>
   </div>
}

export default CartProduct;