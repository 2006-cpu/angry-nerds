import React, { useState, useEffect } from 'react';
import { getCart } from '../api';
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Footer} from './index'
import { getCurrentCart } from '../auth';
// import axios from 'axios';
const stripePromise = loadStripe('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');

const Cart = (props) => {
    const {orders, setOrders, token} = props
    const [total, setTotal] = useState(0)

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

    const handleClick = async (event) => {
        // console.log('handleClick: ', handleClick)
        try{
        const stripe = await stripePromise;
        console.log('stripe:', stripe)
        const response = await fetch ('/create-checkout-session', {method: 'POST'});
        console.log('response: ', response);
        //WHERE IS MY SESSION?
        const session = await response.json()
        console.log('sessionCreated!!: ', session)
        //WHERE IS MY RESULT??
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        console.log('get Stripe Session Result', result)
        if (result.error) {
            return ({
                name:'page load error',
                message: 'I am sorry, looks like the page is under constructions. We are working hard to fix the issue, please come back and try again later!'
            })
        }
    } catch (error) {
        console.error (error)
    }
}
    

    return <div style={{margin: '1.5rem'}} >
    <h1>My Cart</h1>
    <div style={{overflowY: 'auto', marginBottom: '14rem'}}>
    
    {orders ? orders.map((product) => {
        return (
            <div style={{display: 'flex', backgroundColor: 'lightGrey', border: '1px solid grey',
             marginTop: '1rem', padding: '1rem', borderRadius: '15px'}}>
                 <img src={`${product.imageurl}`} style={{width: '10rem', border: '1px solid grey',
                  borderRadius: '15px', marginRight: '2rem'}}></img>
                 <div>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                </div>
            </div>
        )
    }) : <div>Your Cart is Currently Empty!</div>}

    </div>

    {<div style={{position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#B0E0E6', paddingBottom: '1.5rem'}}>
       <h3 style={{borderTop: '1px solid black', marginLeft: '1rem', marginRight: '1rem', padding: '1rem' }}>Total: ${total}</h3>  
       <button style={{marginLeft: '2rem', padding: '1rem', backgroundColor: '#20B2AA', borderRadius: '13px', 
       border: '1px solid black', boxShadow: '0 5px 5px -5px'}} role="/checkout/session" onClick={handleClick}>Checkout</button> 
       <Footer />
    </div>}

    </div>
}

export default Cart;
