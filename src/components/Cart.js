import React, { useState, useEffect } from 'react';
import { getCart } from '../api';
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
// import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_Publishable);

const Cart = (props) => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        getCart().then(
            orders => {
            setOrders(orders.products);
        })
        .catch(error => {
            console.error(error);
        });
      }
    useEffect(() => {
        fetchOrders()
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
    

    return <div >
    <h1>My Cart</h1>
    <div>
    
    {orders.map((product) => {
        return (
            <div>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
            </div>
        )
    })}

    </div>
    {/* <h3>Total: $XX</h3>   */}
    <Button style={{float: 'left'}} variant="primary" size="sm" role="/checkout/session" onClick={handleClick}>Checkout</Button>

    </div>
}

export default Cart;
