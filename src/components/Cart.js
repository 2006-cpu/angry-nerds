import React, { useState, useEffect } from 'react';
import { getCart } from '../api';
import StripeCheckout from 'react-stripe-checkout';
import stripeCheckout from './stripeCheckout';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import {Footer} from './index'

const stripePromise = loadStripe('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');

const Cart = (props) => {
    const {orders, setOrders, token} = props
    const [total, setTotal] = useState(0)

    const fetchOrders = async () => {
        try{
            if(token){
        const obtainedOrders = await getCart()
        setOrders(obtainedOrders.products);
        const allOrders = obtainedOrders.products
        console.log('allOrders ', allOrders)
        let priceArr = []
        allOrders.forEach(product => {
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
        fetchOrders()
        if(!orders){
            setOrders([])
        }
      },[]);
    
    

    return <div style={{margin: '1.5rem'}} >
    <h1>My Cart</h1>
    <div>
    
    {orders ? orders.map((product) => {
        return (
            <div style={{backgroundColor: 'lightGrey', border: '1px solid grey',
             marginTop: '1rem', padding: '1rem', borderRadius: '15px'}}>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
            </div>
        )
    }) : <div>Your Cart is Currently Empty!</div>}
       
    </div>

    {<div style={{position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#B0E0E6', paddingBottom: '1.5rem'}}>
       <h3 style={{borderTop: '1px solid black', marginLeft: '1rem', marginRight: '1rem', padding: '1rem' }}>Total: ${total}</h3>  
       <Elements stripe={stripePromise}>
           <StripeCheckout style={{marginLeft: '2rem', padding: '1rem', backgroundColor: '#20B2AA', borderRadius: '13px', 
       border: '1px solid black', boxShadow: '0 5px 5px -5px'}} role="/checkout/session" />
          </Elements>
        
       <Footer />
    </div>}

      
    </div>
}


  
export default Cart;
