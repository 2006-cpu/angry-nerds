import React, {useState} from 'react';
import axios from 'axios';

import {
    CardElement,
    Elements,
    useElements,
    useStripe,
    StripeCheckout
} from '@stripe/react-stripe-js';

import {loadStripe} from '@stripe/stripe-js';

const requiredStripe = require('stripe')(process.env.stripe_SECRET);
const stripePromise = loadStripe(process.env.stripe_SECRET);

console.log('stripe: ',stripe)

const [error, setError] = useState(null);
const stripe = useStripe();
const elements = useElements();

const stripeCheckout = () => {
console.log('stripeCheckout: ', stripeCheckout)


    const handleChange = (event) => {
        if (event.error) {
            setError(error.message);
        } else {
            setError(null);
        }
    }

///handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = elements.getElement(cardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
            setError(error.message);
        }else {
            setError(null);
            stripeTokenHandler(result.token);
        }
   

    return (
        <form onSubmit={handleSubmit}>
            <div className = "form">
                <label for="card-element">
                    Credit or debit card
                </label>
                <CardElement
                    id="card-element"
                    options={CardElement}
                    onChange={handleChange}
                    />
                    <div className = "card-errors" role="alert">{error}</div>
            </div>
            <button type="submit">Submit Payment</button>
        </form>
    )
}

export default stripeCheckout;