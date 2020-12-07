import React, {useState} from 'react';
import Axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';
import {
    CardElement,
    Elements,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';

const stripe = require('stripe')(process.env.stripe_SECRET)
const stripePromise = loadStripe('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');
console.log('stripe: ',stripe)


const stripeCheckout = () => {

const Card_Element = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
        }
    }
};
console.log('card_elements', Card_Element)


const handleClick = async (event) => {
    try{
        event.preventDefault();
        const stripe = await stripePromise;
        const response = await axios.post ('/orders/cart/checkout');
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        })
    } catch (error) {
        console.error(error)
    }
    return (
        <button role ="" onClick = {handleClick}>
            Checkout
        </button>
    )
    }
}

// const paymentIntent = await stripe.paymentIntents.create({
//     amount: 5000,
//     currency: 'usd',
//     payment_method_types: ['card'],
//     receipt_email: 'cl_test@example.com'

// })
// console.log('paymentIntent: ', paymentIntent)
// return paymentIntent;



export default stripeCheckout;