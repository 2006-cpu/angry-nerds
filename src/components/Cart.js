import React, { useState, useEffect } from 'react';
import { getCart } from '../api';
import StripeCheckout from 'react-stripe-checkout';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import {Footer} from './index'
import { getCurrentCart, getCurrentToken } from '../auth';
import { getProductById } from '../api'
import CartProduct from './CartCard'
const stripePromise = loadStripe('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');

const Cart = (props) => {
    const {orders, setOrders, token} = props
    const [total, setTotal] = useState(0)
    const [editOrders, setEditOrders] = useState(0)
    const [loggedIn, setLoggedIn] = useState(getCurrentToken())
    const [quantity, setQuantity] = useState(1);

    const fetchOrder = async () => {
        try{
            if(token){
        const obtainedOrder = await getCart()
        setOrders(obtainedOrder.products);
        const allProducts = obtainedOrder.products
        console.log('allProducts ', allProducts)
        let priceArr = []
        allProducts.forEach(product => {
               priceArr.push(Number(product.price))
            })
            console.log('arr ', priceArr)
            let newTotal = 0
            for (let i=0; i<priceArr.length; i++){
                newTotal+=priceArr[i]
            }
            setTotal(newTotal)
    } else if (!token){
        setOrders(getCurrentCart())
        const allProducts = orders
        console.log('allProducts ', allProducts)
        let priceArr = []
        allProducts.forEach(product => {
               priceArr.push(Number(product.price))
            })
            console.log('arr ', priceArr)
            let newTotal = 0
            for (let i=0; i<priceArr.length; i++){
                newTotal+=priceArr[i]
            }
            setTotal(newTotal)
    }
        }catch(error){
        console.error(error)
        }
      }
       
    useEffect(() => {
        fetchOrder()
        if(!orders){
            setOrders([])
        }
      },[]);
    
    

    return <div style={{margin: '1.5rem'}} >
    <h1>My Cart</h1>
    <div style={{overflowY: 'auto', marginBottom: '14rem'}}>
    
    {orders ? orders.map((product) => {
        return (
            <CartProduct key={product.id} product={product} setEditOrders={setEditOrders} editOrders={editOrders} setTotal={setTotal}/>
        )
    }) : <div>Your Cart is Currently Empty!</div>}
       
    </div>

    {<div style={{position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#B0E0E6', paddingBottom: '1.5rem'}}>
       <h3 style={{borderTop: '1px solid black', marginLeft: '1rem', marginRight: '1rem', padding: '1rem' }}>Total: ${total}</h3>  
 
           <StripeCheckout style={{marginLeft: '2rem', padding: '1rem', backgroundColor: '#20B2AA', borderRadius: '13px', 
       border: '1px solid black', boxShadow: '0 5px 5px -5px'}} role="/checkout/session" />
        
       <Footer />
    </div>}

      
    </div>
}


  
export default Cart;
